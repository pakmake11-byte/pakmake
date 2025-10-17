import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, company, email, subject, message } = body

    if (!firstName || !lastName || !company || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'preettaparia@gamil.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
            .value { color: #475569; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e2e8f0; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">PakMake Packaging Inc®</p>
            </div>
            <div class="content">
              <div class="info-row">
                <div class="label">From:</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              <div class="info-row">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
              </div>
              <div class="info-row">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
              </div>
              <div class="info-row">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message:</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              <div class="footer">
                <p>This message was sent from the PakMake contact form</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Auto-reply email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting PakMake Packaging Inc®',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .message { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
            .contact-info { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .contact-info h3 { color: #1e40af; margin-top: 0; }
            .office { margin-bottom: 15px; }
            .office strong { color: #1e40af; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Thank You!</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">We've received your message</p>
            </div>
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              <p>Thank you for reaching out to <strong>PakMake Packaging Inc®</strong>. We have received your inquiry and our team will review it shortly.</p>
              
              <div class="message">
                <strong>Your Message Summary:</strong>
                <p style="margin: 10px 0 0 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">We will respond to you at: ${email}</p>
              </div>

              <p><strong>What happens next?</strong></p>
              <ul style="color: #475569;">
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll prepare a personalized response to your questions</li>
                <li>You'll receive a detailed reply from our experts</li>
              </ul>

              <div class="contact-info">
                <h3>Our Contact Information</h3>
                <div class="office">
                  <strong>🇮🇳 India Office:</strong><br>
                  Phone: +91 98291-87167<br>
                  Email: sandeepjaju@yahoo.com
                </div>
                <div class="office">
                  <strong>🇦🇪 UAE Office:</strong><br>
                  Phone: +971 558570247<br>
                  Email: sandeepjaju@yahoo.com
                </div>
              </div>

              <p style="margin-top: 30px;">If you have any urgent questions, feel free to contact us directly using the information above.</p>

              <div class="footer">
                <p><strong>PakMake Packaging Inc®</strong></p>
                <p>Move More Products More Economically</p>
                <p style="font-size: 12px; margin-top: 10px;">This is an automated response. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions),
    ])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}