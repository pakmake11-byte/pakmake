'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 shadow-lg"
          >
            <Building2 className="w-10 h-10 text-blue-600" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">PakMake Packaging Inc®</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-12">
            Pioneering sustainable logistics solutions that transform how businesses 
            handle materials while protecting our planet for future generations.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 sm:gap-8"
          >
            {[
              { label: 'Est. 2021' },
              { label: '50+ Customers' },
              { label: '10+ Countries' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.65, 0, 0.35, 1], 
                  delay: 0.5 + index * 0.1 
                }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}