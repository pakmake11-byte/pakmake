'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
  type Easing,
} from 'framer-motion'
import {
  Send,
  CheckCircle,
  Loader2,
  Mail,
  User,
  Building2,
  MessageSquare,
} from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  company: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [scrollDirection, setScrollDirection] = useState(1)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const updateScrollDirection = () => {
      const direction = window.scrollY > lastScrollY ? 1 : -1
      setScrollDirection(direction)
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

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

  const ease: Easing = [0.65, 0, 0.35, 1]

  // ✨ Animation Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
        staggerDirection: scrollDirection,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ✅ Animated Header */}
      <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 shadow-lg"
        >
          <Mail className="w-8 h-8 text-primary-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          Get in{' '}
          <motion.span
            initial={{ backgroundPositionX: '0%' }}
            animate={isInView ? { backgroundPositionX: '100%' } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
          >
            Touch
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Ready to transform your logistics? Contact our team for a customized
          slip sheet solution.
        </motion.p>
      </div>

      {/* ✅ Main content */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.section
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.8, ease }}
            className="min-h-[60vh] bg-primary-50 rounded-2xl flex items-center justify-center"
          >
            <div className="w-full max-w-2xl text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Message Sent Successfully!
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Thank you for reaching out. Our team will respond within 24
                hours.
              </p>
              <button
                onClick={() => {
                  setFormData({
                    firstName: '',
                    lastName: '',
                    company: '',
                    email: '',
                    subject: '',
                    message: '',
                  })
                  setSubmitted(false)
                  window.location.href = '/contact'
                }}
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="form"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit="exit"
            className="max-w-5xl mx-auto"
          >
            {/* White box appears first */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12"
            >
              {/* Fields inside box animate after it appears */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {error && (
                  <motion.div
                    variants={itemVariants}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary-600" /> First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e =>
                          handleInputChange('firstName', e.target.value)
                        }
                        className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none hover:border-gray-300"
                        placeholder="John"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary-600" /> Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e =>
                          handleInputChange('lastName', e.target.value)
                        }
                        className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none hover:border-gray-300"
                        placeholder="Smith"
                      />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary-600" /> Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={e =>
                          handleInputChange('company', e.target.value)
                        }
                        className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none hover:border-gray-300"
                        placeholder="Your Company Ltd."
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-600" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none hover:border-gray-300"
                        placeholder="john.smith@company.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary-600" /> Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e =>
                        handleInputChange('subject', e.target.value)
                      }
                      className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none hover:border-gray-300"
                      placeholder="Request a Quote"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e =>
                        handleInputChange('message', e.target.value)
                      }
                      className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none resize-vertical hover:border-gray-300"
                      placeholder="Tell us about your requirements..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  )
}