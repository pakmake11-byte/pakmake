'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData(INITIAL_FORM_DATA)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const resetForm = () => {
    setSubmitted(false)
  }

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-paper-texture"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-12 sm:mb-16">
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
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 40 }}
      transition={{ duration: 0.8, ease: EASE_CUBIC }}
      className="relative min-h-[60vh] bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden"
    >
      {/* Confetti effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${['#00A0E3', '#007CB8', '#E6F7FF', '#B3E5FC'][i % 4]}, ${['#007CB8', '#005F8C', '#B3E5FC', '#80D4F8'][i % 4]})`,
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeIn",
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-2xl text-center px-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-primary-600 mx-auto mb-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-primary-900"
        >
          Message Sent Successfully!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-600 mb-8"
        >
          Thank you for reaching out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,160,227,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Send Another Message
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Form Content Component
interface FormContentProps {
  isInView: boolean
  containerVariants: any
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
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.8, ease: EASE_CUBIC, delay: 0.2 }}
        className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border-2 border-primary-100 overflow-hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative z-10"
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 font-medium"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xl">⚠️</span>
                  {error}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                label="First Name"
                icon={User}
                required
                value={formData.firstName}
                onChange={(value) => onInputChange('firstName', value)}
                placeholder="John"
                maxLength={50}
              />
              <FormInput
                label="Last Name"
                icon={User}
                required
                value={formData.lastName}
                onChange={(value) => onInputChange('lastName', value)}
                placeholder="Smith"
                maxLength={50}
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
                maxLength={100}
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
              maxLength={200}
            />

            <FormTextarea
              label="Message"
              required
              value={formData.message}
              onChange={(value) => onInputChange('message', value)}
              placeholder="Tell us about your requirements..."
              maxLength={2000}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}