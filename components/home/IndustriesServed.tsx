'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function IndustriesServed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const industries = [
    { name: 'Food & Beverage', icon: '🍕', description: 'Safe, hygienic handling' },
    { name: 'Pharmaceuticals', icon: '💊', description: 'Clean room compatible' },
    { name: 'Export', icon: '🚢', description: 'International shipping' },
    { name: 'Retail', icon: '🛒', description: 'Store-ready packaging' },
    { name: 'Automotive', icon: '🚗', description: 'Parts & components' },
    { name: 'Electronics', icon: '📱', description: 'Static-free handling' },
    { name: 'Textiles', icon: '👕', description: 'Gentle fabric care' },
    { name: 'Chemicals', icon: '🧪', description: 'Resistant materials' },
    { name: 'Paper & Pulp', icon: '📰', description: 'Industry expertise' }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our slip sheet solutions are trusted across diverse industries worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-5xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {industry.name}
              </h3>
              <p className="text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}