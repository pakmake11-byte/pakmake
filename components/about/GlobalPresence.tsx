'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function GlobalPresence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const offices = [
    {
      location: 'India HQ',
      address: 'Jaipur, Rajasthan',
      details: 'Main manufacturing and R&D facility',
      icon: '🇮🇳'
    },
    {
      location: 'UAE Office',
      address: 'Dubai, United Arab Emirates',
      details: 'Middle East operations center',
      icon: '🇦🇪'
    }
  ]

  const countries = [
    'India', 'UAE', 'Saudi Arabia', 'Qatar', 'Austra', 'Oman',
    'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines',
    'Indonesia', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Myanmar',
    'Egypt', 'Jordan', 'Lebanon', 'Turkey', 'Kenya', 'Tanzania',
    'South Africa', 'Nigeria', 'Ghana'
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From our headquarters in India to offices across the globe,
            we serve customers in over 25 countries worldwide.
          </p>
        </motion.div>

        {/* Office Locations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {offices.map((office, index) => (
            <motion.div
              key={office.location}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-50 rounded-xl p-8 text-center"
            >
              <div className="text-6xl mb-4">{office.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{office.location}</h3>
              <p className="text-primary-600 font-medium mb-2">{office.address}</p>
              <p className="text-gray-600">{office.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive World Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 mb-16"
        >
          <div className="text-center">
            <div className="text-8xl mb-6">🌍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interactive World Map
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our global reach and discover how we&apos;re transforming
              logistics operations across continents.
            </p>
          </div>
        </motion.div>

        {/* Countries Served */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Countries We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, index) => (
              <motion.span
                key={country}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
              >
                {country}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}