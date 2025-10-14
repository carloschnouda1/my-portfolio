import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'

export async function GET() {
  let client: MongoClient | null = null
  
  try {
    console.log('Testing MongoDB connection...')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('MongoDB URI set:', !!MONGODB_URI)
    console.log('MongoDB DB set:', !!MONGODB_DB)
    
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    
    await client.connect()
    console.log('✅ MongoDB connection successful')
    
    const db = client.db(MONGODB_DB)
    const collections = await db.listCollections().toArray()
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection test successful',
      details: {
        database: MONGODB_DB,
        collections: collections.map(c => c.name),
        environment: process.env.NODE_ENV,
        hasUri: !!MONGODB_URI,
        hasDb: !!MONGODB_DB
      }
    })
    
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        name: error instanceof Error ? error.name : 'Unknown',
        environment: process.env.NODE_ENV,
        hasUri: !!MONGODB_URI,
        hasDb: !!MONGODB_DB,
        uriPreview: MONGODB_URI ? MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : 'Not set'
      }
    }, { status: 500 })
    
  } finally {
    if (client) {
      try {
        await client.close()
      } catch (closeError) {
        console.error('Error closing test connection:', closeError)
      }
    }
  }
}
