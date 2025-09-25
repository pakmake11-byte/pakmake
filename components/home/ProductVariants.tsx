'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function ProductVariants() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedVariant, setSelectedVariant] = useState('single-lip')

  const variants = [
    {
      id: 'single-lip',
      title: 'Single-Lip',
      description: 'Access from one side',
      icon: '📄',
      specs: { thickness: '0.8-1.2mm', size: 'Custom', capacity: '1000-2000kg' }
    },
    {
      id: 'double-lip-opposite',
      title: 'Double-Lip (Opposite)',
      description: 'Access from two opposite sides',
      icon: '📑',
      specs: { thickness: '1.0-1.5mm', size: 'Custom', capacity: '1500-2500kg' }
    },
    {
      id: 'double-lip-adjacent',
      title: 'Double-Lip (Adjacent)',
      description: 'Access from two adjacent sides',
      icon: '📋',
      specs: { thickness: '1.2-1.8mm', size: 'Custom', capacity: '2000-3000kg' }
    },
    {
      id: 'multi-lip',
      title: 'Multi-Lip',
      description: 'Access from all four sides',
      icon: '📊',
      specs: { thickness: '1.5-2.0mm', size: 'Custom', capacity: '2500-4000kg' }
    }
  ]

  const materialAdvantages = [
    'High tensile strength kraft liner',
    'Puncture-resistant construction',
    'Multiple layer durability',
    'Virgin kraft material quality',
    'Moisture resistant options'
  ]

  const palletDisadvantages = [
    'Nail puncture risks',
    'Broken board hazards',
    'Pest infestation potential',
    'ISPM 15 compliance required',
    'Maintenance and replacement costs'
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Product Variants & Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from multiple lip configurations to match your specific handling requirements
          </p>
        </motion.div>

        {/* Variant Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {variants.map((variant, index) => (
            <motion.button
              key={variant.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedVariant(variant.id)}
              className={`p-6 rounded-xl transition-all ${
                selectedVariant === variant.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-900 hover:shadow-md hover:scale-102'
              }`}
            >
              <div className="text-4xl mb-3">{variant.icon}</div>
              <h3 className="font-semibold mb-2">{variant.title}</h3>
              <p className={`text-sm ${
                selectedVariant === variant.id ? 'text-primary-100' : 'text-gray-600'
              }`}>
                {variant.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Selected Variant Details */}
        <motion.div
          key={selectedVariant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {variants.find(v => v.id === selectedVariant)?.title} Specifications
              </h3>
              
              <div className="space-y-4">
                {Object.entries(variants.find(v => v.id === selectedVariant)?.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize">{key.replace('-', ' ')}</span>
                    <span className="text-primary-600 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 h-64 flex items-center justify-center">
              <div className="text-8xl">
                {variants.find(v => v.id === selectedVariant)?.icon}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}