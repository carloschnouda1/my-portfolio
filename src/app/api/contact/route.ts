import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'

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
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(MONGODB_DB)
    const collection = db.collection(MONGODB_COLLECTION)
    
    const result = await collection.insertOne(data)
    await client.close()
    
    return result.insertedId
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to save to database')
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
    
    // Save to database and send email in parallel
    const [dbId, emailId] = await Promise.all([
      saveToDatabase(submissionData),
      sendEmail(body)
    ])
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: dbId,
        emailId
      }
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
