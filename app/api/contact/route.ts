import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Validation schemas
const VALIDATION = {
  firstName: { max: 50, min: 1 },
  lastName: { max: 50, min: 1 },
  company: { max: 100, min: 1 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { max: 200, min: 1 },
  message: { max: 2000, min: 10 },
}

// Sanitize input to prevent XSS
const sanitize = (str: string): string => {
  return str
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// Validate field
const validateField = (field: string, value: string, rules: any): string | null => {
  if (rules.min && value.length < rules.min) {
    return `${field} is too short (minimum ${rules.min} characters)`
  }
  if (rules.max && value.length > rules.max) {
    return `${field} is too long (maximum ${rules.max} characters)`
  }
  if (rules.pattern && !rules.pattern.test(value)) {
    return `Invalid ${field} format`
  }
  return null
}

// Create transporter (reusable)
let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true, // Use pooled connections for better performance
      maxConnections: 5,
      maxMessages: 100,
    })
  }
  return transporter
}

// Email templates
const createCompanyEmail = (data: any) => ({
  from: process.env.EMAIL_USER,
  to: 'preettaparia@gmail.com',
  subject: `Contact Form: ${data.subject}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #00A0E3 0%, #007CB8 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 8px; font-weight: 700; }
        .header p { opacity: 0.95; font-size: 16px; }
        .content { padding: 40px 30px; }
        .info-card { background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #00A0E3; }
        .label { font-weight: 600; color: #007CB8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
        .value { color: #475569; font-size: 15px; word-break: break-word; }
        .value a { color: #00A0E3; text-decoration: none; }
        .value a:hover { text-decoration: underline; }
        .message-box { background: white; padding: 24px; border-radius: 12px; margin-top: 20px; border: 2px solid #e2e8f0; }
        .message-text { white-space: pre-wrap; color: #334155; font-size: 15px; line-height: 1.7; }
        .footer { text-align: center; padding: 30px; background: #f8fafc; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0; }
        .timestamp { font-weight: 600; color: #475569; margin-bottom: 8px; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #e2e8f0, transparent); margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>PakMake Packaging Inc®</p>
        </div>
        <div class="content">
          <div class="info-card">
            <div class="label">From:</div>
            <div class="value">${data.firstName} ${data.lastName}</div>
          </div>
          <div class="info-card">
            <div class="label">Company:</div>
            <div class="value">${data.company}</div>
          </div>
          <div class="info-card">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="info-card">
            <div class="label">Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="divider"></div>
          <div class="message-box">
            <div class="label" style="margin-bottom: 12px;">Message</div>
            <div class="message-text">${data.message}</div>
          </div>
        </div>
        <div class="footer">
          <div class="timestamp">${new Date().toLocaleString('en-US', {
    timeZone: 'IST',
    dateStyle: 'full',
    timeStyle: 'long'
  })}</div>
          <div>Sent from PakMake Website Contact Form</div>
        </div>
      </div>
    </body>
    </html>
  `,
})

const createCustomerEmail = (data: any) => ({
  from: process.env.EMAIL_USER,
  to: data.email,
  subject: 'Thank you for contacting PakMake Packaging Inc®',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #00A0E3 0%, #007CB8 100%); color: white; padding: 50px 30px; text-align: center; }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        .header h1 { font-size: 32px; margin-bottom: 12px; font-weight: 700; }
        .header p { opacity: 0.95; font-size: 18px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 16px; color: #475569; margin-bottom: 20px; }
        .timeline { margin: 32px 0; }
        .timeline-title { font-weight: 600; color: #334155; margin-bottom: 16px; font-size: 16px; }
        .timeline-item { display: flex; align-items: flex-start; margin: 16px 0; }
        .timeline-dot { min-width: 12px; height: 12px; background: #00A0E3; border-radius: 50%; margin-right: 12px; margin-top: 6px; }
        .timeline-text { color: #475569; font-size: 15px; }
        .contact-info { background: #f1f5f9; padding: 24px; border-radius: 12px; margin-top: 32px; }
        .contact-title { color: #007CB8; font-weight: 600; margin-bottom: 16px; font-size: 16px; }
        .office { margin-bottom: 16px; padding: 16px; background: white; border-radius: 8px; }
        .office-name { font-weight: 600; color: #007CB8; margin-bottom: 8px; font-size: 15px; }
        .office-detail { color: #475569; font-size: 14px; margin: 4px 0; }
        .office-detail a { color: #00A0E3; text-decoration: none; }
        .office-detail a:hover { text-decoration: underline; }
        .footer { text-align: center; padding: 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
        .company-name { font-weight: 600; color: #334155; font-size: 16px; margin-bottom: 8px; }
        .tagline { color: #00A0E3; font-style: italic; font-size: 14px; margin-bottom: 16px; }
        .disclaimer { font-size: 12px; color: #94a3b8; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #e2e8f0, transparent); margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You!</h1>
          <p>We've received your message</p>
        </div>
        <div class="content">
          <div class="greeting">
            Dear <strong>${data.firstName} ${data.lastName}</strong>,
          </div>
          <p style="color: #475569; font-size: 15px; margin-bottom: 16px;">
            Thank you for reaching out to <strong>PakMake Packaging Inc®</strong>. We have successfully received your inquiry and our team is excited to assist you.
          </p>
          
          <div class="timeline">
            <div class="timeline-title">What happens next?</div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-text">Our team will review your inquiry within 24-48 hours</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-text">You'll receive a detailed reply from our experts</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="contact-info">
            <div class="contact-title">Our Contact Information</div>
            <div class="office">
              <div class="office-name">🇮🇳 INDIA Office</div>
              <div class="office-detail">Phone: <a href="tel:+919829187167">+91 98291-87167</a></div>
              <div class="office-detail">Email: <a href="mailto:sandeepjaju@yahoo.com">sandeepjaju@yahoo.com</a></div>
            </div>
            <div class="office">
              <div class="office-name">🇦🇪 UAE Office</div>
              <div class="office-detail">Phone: <a href="tel:+971558570247">+971 558570247</a></div>
              <div class="office-detail">Email: <a href="mailto:sandeepjaju@yahoo.com">sandeepjaju@yahoo.com</a></div>
            </div>
          </div>
          <p style="margin-top: 32px; color: #64748b; font-size: 14px;">
            If you have any urgent questions, feel free to contact us directly using the information above.
          </p>
        </div>
        <div class="footer">
          <div class="company-name">PakMake Packaging Inc®</div>
          <div class="tagline">Move More Products More Economically</div>
          <div class="disclaimer">This is an automated response. Please do not reply to this email directly.</div>
        </div>
      </div>
    </body>
    </html>
  `,
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const { firstName, lastName, company, email, subject, message } = body

    // Check required fields
    const requiredFields = { firstName, lastName, company, email, subject, message }
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || typeof value !== 'string' || !value.trim())
      .map(([key]) => key)

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    const validationErrors = [
      validateField('First name', firstName, VALIDATION.firstName),
      validateField('Last name', lastName, VALIDATION.lastName),
      validateField('Company', company, VALIDATION.company),
      validateField('Subject', subject, VALIDATION.subject),
      validateField('Message', message, VALIDATION.message),
      validateField('Email', email, VALIDATION.email),
    ].filter((e): e is string => Boolean(e))

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors[0] },
        { status: 400 }
      )
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      company: sanitize(company),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    }

    // Get transporter and send emails in parallel
    const transport = getTransporter()

    const [companyResult, customerResult] = await Promise.allSettled([
      transport.sendMail(createCompanyEmail(sanitizedData)),
      transport.sendMail(createCustomerEmail(sanitizedData)),
    ])

    // Check if both emails were sent successfully
    const companySuccess = companyResult.status === 'fulfilled'
    const customerSuccess = customerResult.status === 'fulfilled'

    if (!companySuccess && !customerSuccess) {
      console.error('Both emails failed:', { companyResult, customerResult })
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again later.' },
        { status: 500 }
      )
    }

    if (!companySuccess) {
      console.error('Company email failed:', companyResult)
    }

    if (!customerSuccess) {
      console.error('Customer email failed:', customerResult)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        partialSuccess: !companySuccess || !customerSuccess,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}