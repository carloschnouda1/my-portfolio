import { MongoClient, Db, ObjectId } from 'mongodb'

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'

// Database connection cache
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(MONGODB_DB)
    
    // Cache the connection
    cachedClient = client
    cachedDb = db
    
    console.log('Connected to MongoDB successfully')
    
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw new Error('Database connection failed')
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
    console.log('MongoDB connection closed')
  }
}

// Database operations
export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  timestamp: Date
  ip?: string
}

export async function saveContactSubmission(data: Omit<ContactSubmission, 'timestamp'>): Promise<string> {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('contact_submissions')
    
    const submission: ContactSubmission = {
      ...data,
      timestamp: new Date()
    }
    
    const result = await collection.insertOne(submission)
    return result.insertedId.toString()
  } catch (error) {
    console.error('Error saving contact submission:', error)
    throw new Error('Failed to save contact submission')
  }
}

export async function getContactSubmissions(limit: number = 50): Promise<ContactSubmission[]> {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('contact_submissions')
    
    const submissions = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray()
    
    return submissions as unknown as ContactSubmission[]
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    throw new Error('Failed to fetch contact submissions')
  }
}

export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('contact_submissions')
    
    const submission = await collection.findOne({ _id: new ObjectId(id) })
    return submission as ContactSubmission | null
  } catch (error) {
    console.error('Error fetching contact submission:', error)
    throw new Error('Failed to fetch contact submission')
  }
}
