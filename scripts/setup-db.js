#!/usr/bin/env node

/**
 * MongoDB Setup Script
 * This script helps set up the MongoDB database for the portfolio contact form
 */

const { MongoClient } = require('mongodb')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'

async function setupDatabase() {
  let client
  
  try {
    console.log('Connecting to MongoDB...')
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(MONGODB_DB)
    console.log(`Connected to database: ${MONGODB_DB}`)
    
    // Create collection if it doesn't exist
    const collections = await db.listCollections().toArray()
    const contactCollectionExists = collections.some(col => col.name === 'contact_submissions')
    
    if (!contactCollectionExists) {
      await db.createCollection('contact_submissions')
      console.log('Created contact_submissions collection')
      
      // Create indexes for better performance
      const collection = db.collection('contact_submissions')
      await collection.createIndex({ email: 1 })
      await collection.createIndex({ timestamp: -1 })
      await collection.createIndex({ subject: 'text', message: 'text' })
      console.log('Created indexes for contact_submissions collection')
    } else {
      console.log('contact_submissions collection already exists')
    }
    
    // Test the connection
    const testDoc = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
      timestamp: new Date(),
      ip: '127.0.0.1'
    }
    
    const collection = db.collection('contact_submissions')
    const result = await collection.insertOne(testDoc)
    console.log(`Test document inserted with ID: ${result.insertedId}`)
    
    // Clean up test document
    await collection.deleteOne({ _id: result.insertedId })
    console.log('Test document cleaned up')
    
    console.log('✅ Database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
      console.log('Database connection closed')
    }
  }
}

// Run the setup
setupDatabase()
