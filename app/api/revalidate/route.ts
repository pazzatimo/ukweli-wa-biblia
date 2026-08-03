import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// Optional: Add a secret to prevent unauthorized calls
const SECRET = process.env.REVALIDATE_SECRET || 'my-secret-key'

export async function POST(req: NextRequest) {
  try {
    // Verify secret (optional but recommended)
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Sanity sends a payload with document IDs and types
    const body = await req.json()
    const { _type, _id } = body

    // Revalidate specific tags or paths
    // You can revalidate by tag or by path
    // We'll revalidate the home page and all content pages
    revalidateTag('all-content') // revalidates all content

    // Alternatively, you can revalidate specific paths:
    // revalidatePath('/')
    // revalidatePath('/makala')
    // revalidatePath(`/makala/${slug}`)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}