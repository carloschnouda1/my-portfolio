import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { MongoClient, ObjectId } from 'mongodb'

// Types
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactSubmission extends ContactFormData {
  timestamp: Date
  ip?: string
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'contact_submissions'

// Gmail SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // Your Gmail App Password (not regular password)
    }
  })
}

// Save to MongoDB
async function saveToDatabase(data: ContactSubmission) {
  let client: MongoClient | null = null
  try {
    console.log('Attempting to connect to MongoDB...')
    console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')) // Hide credentials in logs
    console.log('MongoDB DB:', MONGODB_DB)
    
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
    })
    
    await client.connect()
    console.log('MongoDB connection established')
    
    const db = client.db(MONGODB_DB)
    const collection = db.collection(MONGODB_COLLECTION)
    
    console.log('Inserting document into MongoDB...')
    const result = await collection.insertOne(data)
    console.log('Document inserted successfully with ID:', result.insertedId)
    
    return result.insertedId
  } catch (error) {
    console.error('Database error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      mongodbUri: MONGODB_URI ? 'Set' : 'Missing',
      mongodbDb: MONGODB_DB ? 'Set' : 'Missing'
    })
    throw new Error(`Failed to save to database: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    if (client) {
      try {
        await client.close()
        console.log('MongoDB connection closed')
      } catch (closeError) {
        console.error('Error closing MongoDB connection:', closeError)
      }
    }
  }
}

// Send email
async function sendEmail(data: ContactFormData) {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #007bff;">${data.email}</a></p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    }
    
    const result = await transporter.sendMail(mailOptions)
    return result.messageId
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Prepare data for database
    const submissionData: ContactSubmission = {
      ...body,
      timestamp: new Date(),
      ip
    }
    
    // Send email first (most important)
    let emailId: string
    let dbId: ObjectId | null = null
    let dbError: string | null = null
    
    try {
      emailId = await sendEmail(body)
    } catch (error) {
      console.error('Email sending failed:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }
    
    // Try to save to database (optional, don't fail if this doesn't work)
    try {
      dbId = await saveToDatabase(submissionData)
    } catch (error) {
      console.error('Database save failed:', error)
      dbError = 'Failed to save to database, but email was sent successfully'
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: dbId,
        emailId
      },
      ...(dbError && { warning: dbError })
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit contact form',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
