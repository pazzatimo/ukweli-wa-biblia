import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { secret, path } = await request.json()

    // Verify the secret matches
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // If a specific path is provided, revalidate that path
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Otherwise revalidate the entire site (all pages)
    // This revalidates all routes under the root layout
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true, path: '/' })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}