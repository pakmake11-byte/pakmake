'use client'

import { useState, useRef } from 'react'
import { motion, useInView, type Variants, type Easing } from "framer-motion"
import { Send, CheckCircle, Loader2, Mail, User, Building2, MessageSquare } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  company: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const easeInOutCustom: Easing = [0.65, 0, 0.35, 1] // Smooth both ways

const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: easeInOutCustom,
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 1.2,
      ease: easeInOutCustom,
    },
  },
}

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: easeInOutCustom,
    },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: {
      duration: 1.2,
      ease: easeInOutCustom,
    },
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
      duration: 1.4,
      ease: easeInOutCustom,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: easeInOutCustom,
    },
  },
}


  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          <div className="relative bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl p-8 sm:p-12 overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
              className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-20 -mr-32 -mt-32"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 200 }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-primary-300 rounded-full opacity-20 -ml-24 -mb-24"
            />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 150 }}
                className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-6"
              >
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Message Sent Successfully!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-lg sm:text-xl text-gray-600 mb-8"
              >
                Thank you for reaching out. Our team will respond within 24 hours.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    firstName: '',
                    lastName: '',
                    company: '',
                    email: '',
                    subject: '',
                    message: ''
                  })
                }}
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Send Another Message
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="bg-primary-100 p-4 rounded-2xl">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Get in <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Touch</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your logistics? Contact our team for a customized
            slip sheet solution that fits your specific needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl transform rotate-1 scale-[1.02] opacity-10" />

          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div variants={itemVariantsLeft} className="group">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none hover:border-gray-300"
                    placeholder="John"
                  />
                </motion.div>

                <motion.div variants={itemVariantsRight} className="group">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none hover:border-gray-300"
                    placeholder="Smith"
                  />
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div variants={itemVariantsLeft}>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-600" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none hover:border-gray-300"
                    placeholder="Your Company Ltd."
                  />
                </motion.div>

                <motion.div variants={itemVariantsRight}>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none hover:border-gray-300"
                    placeholder="john.smith@company.com"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariantsLeft}>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary-600" />
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none hover:border-gray-300"
                  placeholder="Request a Quote"
                />
              </motion.div>

              <motion.div variants={itemVariantsRight}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 outline-none resize-vertical hover:border-gray-300"
                  placeholder="Tell us about your requirements, challenges, or questions..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-center pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}