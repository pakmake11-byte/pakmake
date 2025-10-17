'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { StatsCounter } from '@/components/ui/StatsCounter'

export function EnvironmentalImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const impactStats = [
    {
      title: 'Freight Cost Savings',
      value: 40,
      suffix: '%',
      icon: '🚛',
      description: 'Reduced shipping costs due to lighter weight'
    },
    {
      title: 'CO₂ Reduction vs Plastic',
      value: 65,
      suffix: '%',
      icon: '🌱',
      description: 'Lower carbon footprint than plastic alternatives'
    },
    {
      title: 'CO₂ Reduction vs Wood',
      value: 85,
      suffix: '%',
      icon: '🌳',
      description: 'Significant reduction compared to wooden pallets'
    },
    {
      title: 'Recycling Rate',
      value: 100,
      suffix: '%',
      icon: '♻️',
      description: 'Fully recyclable kraft paper material'
    },
    {
      title: 'Container Space Saved',
      value: 70,
      suffix: '%',
      icon: '📦',
      description: 'More products per container shipment'
    },
    {
      title: 'Weight Reduction',
      value: 95,
      suffix: '%',
      icon: '⚖️',
      description: 'Dramatically lighter than wooden pallets'
    }
  ]

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Environmental Impact & Savings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our slip sheets deliver measurable environmental benefits and cost savings 
            across your entire supply chain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.title}
              </h3>
              <div className="mb-3">
                <StatsCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl font-bold text-primary-600"
                />
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}