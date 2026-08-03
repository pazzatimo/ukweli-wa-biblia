import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tafadhali jaza sehemu zote' },
        { status: 400 }
      )
    }

    // Here you would send an email using Resend, Nodemailer, or similar
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // TODO: Replace with actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@ukweliwabiblia.com',
    //   to: 'your-email@example.com',
    //   subject: `Ujumbe Mpya: ${subject}`,
    //   html: `<p><strong>Jina:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Mada:</strong> ${subject}</p>
    //          <p><strong>Ujumbe:</strong> ${message}</p>`,
    // })

    return NextResponse.json(
      { message: 'Ujumbe wako umetumwa!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Hitilafu ya mtandao. Tafadhali jaribu tena.' },
      { status: 500 }
    )
  }
}