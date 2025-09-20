'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "PakMake's slip sheets transformed our logistics. We've seen 75% cost reduction and significantly faster loading times.",
      author: "Sarah Johnson",
      company: "Global Foods Inc",
      role: "Supply Chain Director"
    },
    {
      quote: "The environmental benefits align perfectly with our sustainability goals. 100% recyclable and massive space savings.",
      author: "Michael Chen",
      company: "EcoTech Solutions",
      role: "Sustainability Manager"
    },
    {
      quote: "Switching to slip sheets was the best decision for our export operations. ISPM 15 exemption saves us weeks of processing.",
      author: "Ahmed Al-Rashid",
      company: "Middle East Trading Co",
      role: "Operations Manager"
    }
  ]

  const metrics = [
    { label: 'Average Savings', value: '80%', icon: '💰' },
    { label: 'Capacity Increase', value: '12-15%', icon: '📦' },
    { label: 'Loading Speed', value: '60%', icon: '⚡' },
    { label: 'Client Retention', value: '95%', icon: '🤝' },
    { label: 'Countries Served', value: '25+', icon: '🌍' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section ref={ref} className="py-20 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of companies that have transformed their logistics with our solutions
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16 relative"
        >
          <div className="text-center">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-4xl text-primary-600 mb-6">&quot;</div>
              <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 italic">
                {testimonials[currentTestimonial].quote}
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-primary-600 mb-1">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-gray-500">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg"
            >
              <div className="text-3xl mb-3">{metric.icon}</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {metric.value}
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Certified & Compliant
          </h3>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold border-2 border-gray-300 px-4 py-2 rounded">SFI®</div>
            <div className="text-2xl font-bold border-2 border-gray-300 px-4 py-2 rounded">ISO</div>
            <div className="text-2xl font-bold border-2 border-gray-300 px-4 py-2 rounded">Sedex</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
