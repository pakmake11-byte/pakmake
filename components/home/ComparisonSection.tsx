'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const comparisons = [
    {
      metric: 'Cost per unit',
      slipSheet: '$2-5',
      pallet: '$15-25',
      savings: '80%'
    },
    {
      metric: 'Storage space (1,000 units)',
      slipSheet: '1m³',
      pallet: '70m³',
      savings: '98.5%'
    },
    {
      metric: 'Weight',
      slipSheet: '<1kg',
      pallet: '15-25kg',
      savings: '95%'
    },
    {
      metric: 'Loading time',
      slipSheet: '40% faster',
      pallet: 'Standard',
      savings: '40%'
    }
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
            Slip Sheets vs. Wooden Pallets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the dramatic difference our slip sheets make compared to traditional pallets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.metric}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {comparison.metric}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {comparison.slipSheet}
                  </div>
                  <div className="text-sm text-gray-600">Slip Sheet</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {comparison.pallet}
                  </div>
                  <div className="text-sm text-gray-600">Wooden Pallet</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {comparison.savings} savings
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Visual Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-8 p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="w-20 h-20 bg-brown-200 rounded-lg mb-4 flex items-center justify-center text-4xl">
                🏗️
              </div>
              <p className="text-sm text-gray-600">Traditional Pallet</p>
            </div>
            
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary-500 text-3xl"
            >
              →
            </motion.div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-lg mb-4 flex items-center justify-center text-4xl">
                📄
              </div>
              <p className="text-sm text-gray-600">Slip Sheet</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}