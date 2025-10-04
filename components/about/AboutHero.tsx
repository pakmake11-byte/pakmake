'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About PakMake Packaging Inc®
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Pioneering sustainable logistics solutions that transform how businesses 
            handle materials while protecting our planet for future generations.
          </p>
          
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>Est. 2021</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>450+ Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>25+ Countries</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}