'use client'

import { motion } from 'framer-motion'
import { SlipSheetModel } from '@/components/three/SlipSheetModelNew'
import { StatsCounter } from '@/components/ui/StatsCounter'

export function HeroSection() {
  const stats = [
    { label: 'CO₂ Saved', value: 15240, suffix: 'tons' },
    { label: 'Storage Space Saved', value: 85, suffix: '%' },
    { label: 'Cost Savings Generated', value: 2.5, suffix: 'M $' },
    { label: 'Customers Served', value: 450, suffix: '+' },
  ]

  return (
    <section className="relative min-h-[calc(100vh-5rem)]  bg-primary-50  overflow-hidden top-20">
      {/* Main content wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-25">
        {/* Hero grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Move More Products
              <span className="block text-primary-600">More Economically</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Revolutionary slip sheet solutions that replace traditional wooden pallets,
              delivering 80% cost reduction and 100% sustainability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Request Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Get Brochure
              </motion.button>
            </div>
          </motion.div>

          {/* Hero 3D model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-100 lg:h-full"
          >
            <SlipSheetModel />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center pb-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-2xl lg:text-3xl font-bold text-primary-600"
              />
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
