import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// -------------------
// Types
// -------------------
interface ValidationRule {
  max?: number
  min?: number
  pattern?: RegExp
}

interface ContactFormData {
  firstName: string
  lastName: string
  company: string
  email: string
  subject: string
  message: string
}

// -------------------
// Validation schemas
// -------------------
const VALIDATION: Record<keyof ContactFormData, ValidationRule> = {
  firstName: { max: 50, min: 1 },
  lastName: { max: 50, min: 1 },
  company: { max: 100, min: 1 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { max: 200, min: 1 },
  message: { max: 2000, min: 10 },
}

// -------------------
// Sanitization
// -------------------
const sanitize = (str: string): string =>
  str
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()

// -------------------
// Validation
// -------------------
const validateField = (field: string, value: string, rules: ValidationRule): string | null => {
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

// -------------------
// Email Transport
// -------------------
let transporter: nodemailer.Transporter | null = null

const getTransporter = (): nodemailer.Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    })
  }
  return transporter
}

// -------------------
// Email Templates
// -------------------
const createCompanyEmail = (data: ContactFormData) => ({
  from: process.env.EMAIL_USER,
  to: 'preettaparia@gmail.com',
  subject: `Contact Form: ${data.subject}`,
  html: `...`, // (unchanged HTML)
})

const createCustomerEmail = (data: ContactFormData) => ({
  from: process.env.EMAIL_USER,
  to: data.email,
  subject: 'Thank you for contacting PakMake Packaging Inc®',
  html: `...`, // (unchanged HTML)
})

// -------------------
// API Route
// -------------------
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    const { firstName, lastName, company, email, subject, message } = body

    const requiredFields: Record<string, string> = { firstName, lastName, company, email, subject, message }
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value || typeof value !== 'string' || !value.trim())
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
      return NextResponse.json({ error: validationErrors[0] }, { status: 400 })
    }

    const sanitizedData: ContactFormData = {
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      company: sanitize(company),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    }

    const transport = getTransporter()

    const [companyResult, customerResult] = await Promise.allSettled([
      transport.sendMail(createCompanyEmail(sanitizedData)),
      transport.sendMail(createCustomerEmail(sanitizedData)),
    ])

    const companySuccess = companyResult.status === 'fulfilled'
    const customerSuccess = customerResult.status === 'fulfilled'

    if (!companySuccess && !customerSuccess) {
      console.error('Both emails failed:', { companyResult, customerResult })
      return NextResponse.json({ error: 'Failed to send emails. Please try again later.' }, { status: 500 })
    }

    if (!companySuccess) console.error('Company email failed:', companyResult)
    if (!customerSuccess) console.error('Customer email failed:', customerResult)

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
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 })
  }
}
