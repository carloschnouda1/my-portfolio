import { NextRequest, NextResponse } from 'next/server'
import { getContactSubmissions } from '@/utils/database'

// Simple admin authentication (you might want to implement proper auth)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-key'

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '50')
    
    const submissions = await getContactSubmissions(limit)
    
    return NextResponse.json({
      success: true,
      data: submissions,
      count: submissions.length
    })
    
  } catch (error) {
    console.error('Admin contacts error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch contact submissions',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
