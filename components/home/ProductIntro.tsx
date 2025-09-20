'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ProductIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    { label: 'Durable and puncture resistant', icon: '🛡️' },
    { label: 'High tensile strength', icon: '💪' },
    { label: 'Made from 100% virgin kraft linear board', icon: '🌱' },
    { label: 'Custom Sizes', icon: '📐' },
    { label: '100% Recyclable', icon: '♻️' },
    { label: '80% Cost Reduction', icon: '💰' },
    { label: '12-15% More Products', icon: '📦' },
    { label: '1/20th Weight of wooden pallet', icon: '⚖️' },
    { label: '60% Faster Loading', icon: '⚡' },
    { label: 'ISPM 15 Exempt', icon: '✅' },
    { label: 'No Maintenance', icon: '🔧' },
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
            Revolutionary Slip Sheet Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our kraft paper slip sheets deliver unmatched performance with 
            sustainable materials and innovative design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-8xl">📄</div>
            </div>
            
            {/* Interactive hotspots would go here in a real implementation */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-2xl">{feature.icon}</div>
                <p className="text-lg text-gray-700">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}