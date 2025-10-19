'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, User, Building2, MessageSquare, CheckCircle } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createContainerVariants, EASE_CUBIC } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FormInput } from './FormInput'
import { FormTextarea } from './FormTextarea'
import { SubmitButton } from './SubmitButton'

interface FormData {
  firstName: string
  lastName: string
  company: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const { ref, isInView } = useInViewAnimation()
  const scrollDirection = useScrollDirection()
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const containerVariants = createContainerVariants(scrollDirection)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to send message')
      setSubmitted(true)
    } catch {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setSubmitted(false)
    window.location.href = '/contact'
  }

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-primary-50"
    >
      <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16">
        <SectionHeader
          icon={Mail}
          title="Get in"
          highlightedText="Touch"
          subtitle="Ready to transform your logistics? Contact our team for a customized slip sheet solution."
          isInView={isInView}
        />
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessMessage key="success" onReset={resetForm} />
        ) : (
          <FormContent
            key="form"
            isInView={isInView}
            containerVariants={containerVariants}
            formData={formData}
            error={error}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Success Message Component
function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.8, ease: EASE_CUBIC }}
      className="min-h-[60vh] bg-white rounded-2xl flex items-center justify-center shadow-xl"
    >
      <div className="w-full max-w-2xl text-center px-4">
        <CheckCircle className="w-16 h-16 text-[#007CB8] mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#003E5C]">
          Message Sent Successfully!
        </h2>
        <p className="text-lg sm:text-xl text-[#334155] mb-8">
          Thank you for reaching out. Our team will respond within 48 hours.
        </p>
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-[#00A0E3] to-[#007CB8] text-white px-8 py-3 rounded-full font-semibold hover:from-[#007CB8] hover:to-[#005F8C] transition-all shadow-lg hover:shadow-xl"
        >
          Send Another Message
        </button>
      </div>
    </motion.section>
  )
}

// Form Content Component
interface FormContentProps {
  isInView: boolean
  containerVariants: Variants
  formData: FormData
  error: string
  isSubmitting: boolean
  onInputChange: (field: keyof FormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function FormContent({
  isInView,
  containerVariants,
  formData,
  error,
  isSubmitting,
  onInputChange,
  onSubmit
}: FormContentProps) {
  return (
    <motion.section
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="exit"
      className="max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: EASE_CUBIC, delay: 0.2 }}
        className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-[#B3E5FC]"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                label="First Name"
                icon={User}
                required
                value={formData.firstName}
                onChange={(value) => onInputChange('firstName', value)}
                placeholder="John"
              />
              <FormInput
                label="Last Name"
                icon={User}
                required
                value={formData.lastName}
                onChange={(value) => onInputChange('lastName', value)}
                placeholder="Smith"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                label="Company Name"
                icon={Building2}
                required
                value={formData.company}
                onChange={(value) => onInputChange('company', value)}
                placeholder="Your Company Ltd."
              />
              <FormInput
                label="Email Address"
                icon={Mail}
                type="email"
                required
                value={formData.email}
                onChange={(value) => onInputChange('email', value)}
                placeholder="john.smith@company.com"
              />
            </div>

            <FormInput
              label="Subject"
              icon={MessageSquare}
              required
              value={formData.subject}
              onChange={(value) => onInputChange('subject', value)}
              placeholder="Request a Quote"
            />

            <FormTextarea
              label="Message"
              required
              value={formData.message}
              onChange={(value) => onInputChange('message', value)}
              placeholder="Tell us about your requirements..."
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}