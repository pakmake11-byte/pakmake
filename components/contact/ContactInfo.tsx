'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const offices = [
    {
      country: 'India',
      city: 'Jaipur, Rajasthan',
      flag: '🇮🇳',
      email: 'india@pakmake.com',
      phone: '+91 XXX XXX XXXX',
      address: 'Jaipur',
    },
    {
      country: 'UAE',
      city: 'Dubai, United Arab Emirates',
      flag: '🇦🇪',
      email: 'uae@pakmake.com',
      phone: '+971 XXX XXX XXXX',
      address: 'Business Bay, Dubai - 00000',
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Global Offices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with our local teams for personalized support in your region
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {offices.map((office, index) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{office.flag}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{office.country} Office</h3>
                  <p className="text-primary-600">{office.city}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div>
                    <p className="font-medium text-gray-900">Email: </p>
                    <span className="text-gray-600">{office.email}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-primary-100 rounded-lg p-6 text-center">
                <p className="text-primary-700 font-medium">Interactive Map</p>
                <p className="text-sm text-primary-600">Click to view location</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
