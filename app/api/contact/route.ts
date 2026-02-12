import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limit: 5 emails per hour per IP
const RATE_LIMIT = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (userLimit.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  userLimit.count++
  return { allowed: true, remaining: RATE_LIMIT - userLimit.count }
}

// Email template for you (admin)
function getAdminEmailHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 30px; background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                      📧 New Contact Form Submission
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                      You have a new message from your portfolio website
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Sender Info -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 15px; background-color: #f8fafc; border-left: 4px solid #0EA5E9;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                            From
                          </p>
                          <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: 600;">
                            ${data.name}
                          </p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: #0EA5E9;">
                            ${data.email}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Subject -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 15px; background-color: #f8fafc; border-left: 4px solid #06B6D4;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                            Subject
                          </p>
                          <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: 600;">
                            ${data.subject}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                            Message
                          </p>
                          <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-wrap;">
                            ${data.message}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Quick Reply Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                      <tr>
                        <td align="center">
                          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" 
                             style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(14, 165, 233, 0.3);">
                            Reply to ${data.name}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 12px; color: #64748b; text-align: center;">
                      This email was sent from your portfolio contact form
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8; text-align: center;">
                      ${new Date().toLocaleString('en-US', { 
                        dateStyle: 'full', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

// Auto-reply email template for sender
function getAutoReplyHTML(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Me</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 30px; background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-align: center;">
                      ✉️ Message Received!
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                      Hi <strong>${name}</strong>,
                    </p>

                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                      Thank you for reaching out! I've received your message and really appreciate you taking the time to contact me.
                    </p>

                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                      I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
                    </p>

                    <!-- Info Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                      <tr>
                        <td style="padding: 20px; background-color: #f0f9ff; border-left: 4px solid #0EA5E9; border-radius: 4px;">
                          <p style="margin: 0; font-size: 14px; color: #0369a1; line-height: 1.6;">
                            💡 <strong>In the meantime:</strong><br>
                            Feel free to check out my portfolio to learn more about my work and experience.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 20px 0 0 0; font-size: 16px; color: #1e293b; line-height: 1.6;">
                      Best regards,<br>
                      <strong style="color: #0EA5E9;">Mohmed Shoban Shaikh</strong><br>
                      <span style="font-size: 14px; color: #64748b;">Software Developer</span>
                    </p>

                    <!-- Social Links -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 15px 0; font-size: 14px; color: #64748b;">
                            Connect with me:
                          </p>
                          <table role="presentation" style="border-collapse: collapse; margin: 0 auto;">
                            <tr>
                              <td style="padding: 0 8px;">
                                <a href="https://linkedin.com/in/your-profile" style="text-decoration: none; color: #0A66C2; font-size: 14px; font-weight: 600;">
                                  LinkedIn
                                </a>
                              </td>
                              <td style="padding: 0 8px; color: #cbd5e1;">|</td>
                              <td style="padding: 0 8px;">
                                <a href="https://github.com/shobanshaikh27" style="text-decoration: none; color: #1e293b; font-size: 14px; font-weight: 600;">
                                  GitHub
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
                      This is an automated confirmation email. Please do not reply directly to this message.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again in an hour.',
          remaining: 0
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Log the received data for debugging
    console.log('Received form data:', JSON.stringify(body, null, 2))
    
    const { name, email, subject, message, honeypot } = body

    // // Honeypot check (spam protection)
    // // If honeypot field is filled, it's likely a bot
    // if (honeypot && honeypot.trim() !== '') {
    //   console.log('Honeypot triggered - potential spam')
    //   // Return success to fool bots, but don't send email
    //   return NextResponse.json(
    //     { success: true, message: 'Message sent successfully!' },
    //     { status: 200 }
    //   )
    // }

    // Validation - check if fields exist and are not empty
    if (!name || !email || !subject || !message) {
      console.log('Validation failed - missing fields:', { name: !!name, email: !!email, subject: !!subject, message: !!message })
      return NextResponse.json(
        { error: 'All fields are required. Please fill out all fields.' },
        { status: 400 }
      )
    }

    // Check if fields are just whitespace
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
      console.log('Validation failed - empty fields after trim')
      return NextResponse.json(
        { error: 'Please provide valid information in all fields.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format:', email)
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Check if RECEIVING_EMAIL is configured
    if (!process.env.RECEIVING_EMAIL) {
      console.error('RECEIVING_EMAIL is not configured')
      return NextResponse.json(
        { error: 'Receiving email is not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    console.log('Sending emails...')

    // Send email to you (admin)
    try {
      const adminEmailResult = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.RECEIVING_EMAIL,
        subject: `New Contact: ${subject}`,
        html: getAdminEmailHTML({ name, email, subject, message }),
      })
      console.log('Admin email sent successfully:', adminEmailResult)
    } catch (emailError: any) {
      console.error('Failed to send admin email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send notification email. Please try again.' },
        { status: 500 }
      )
    }

    // Send auto-reply to sender
    try {
      const autoReplyResult = await resend.emails.send({
        from: 'Mohmed Shoban Shaikh <onboarding@resend.dev>',
        to: email,
        subject: 'Thank you for contacting me!',
        html: getAutoReplyHTML(name),
      })
      console.log('Auto-reply sent successfully:', autoReplyResult)
    } catch (emailError: any) {
      console.error('Failed to send auto-reply:', emailError)
      // Don't fail the request if auto-reply fails
      // The important email (to you) was already sent
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        remaining: rateLimit.remaining,
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
