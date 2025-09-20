'use client'

import { motion } from 'framer-motion'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { StatsCounter } from '@/components/ui/StatsCounter'

export function HeroSection() {
  const stats = [
    { label: 'CO₂ Saved', value: 15240, suffix: 'tons' },
    { label: 'Storage Space Saved', value: 85, suffix: '%' },
    { label: 'Cost Savings Generated', value: 2.5, suffix: 'M $' },
    { label: 'Customers Served', value: 450, suffix: '+' },
  ]

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;40&quot; height=&quot;40&quot; viewBox=&quot;0 0 40 40&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%23f3f4f6&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M0 40L40 0H20L0 20M40 40V20L20 40&quot;/&gt;%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
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
                  className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Get Quote
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Contact Us
                </motion.button>
              </div>

              {/* Dynamic Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-full"
            >
              <SlipSheetModel />

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="flex flex-col items-center text-gray-400">
                  <span className="text-sm mb-2">Scroll to explore</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
