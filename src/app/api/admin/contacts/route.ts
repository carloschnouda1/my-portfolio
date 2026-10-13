import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getContactSubmissions } from '@/utils/database'

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100

// Admin access requires ADMIN_SECRET to be set. There is no fallback value:
// if it is missing, the endpoint refuses every request.
function isAuthorized(request: NextRequest, secret: string): boolean {
  const header = request.headers.get('authorization') ?? ''
  const expected = Buffer.from(`Bearer ${secret}`)
  const received = Buffer.from(header)

  return received.length === expected.length && timingSafeEqual(received, expected)
}

function parseLimit(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_LIMIT
  return Math.min(parsed, MAX_LIMIT)
}

export async function GET(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'Admin access is not configured' },
      { status: 503 }
    )
  }

  if (!isAuthorized(request, secret)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const url = new URL(request.url)
    const limit = parseLimit(url.searchParams.get('limit'))

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
