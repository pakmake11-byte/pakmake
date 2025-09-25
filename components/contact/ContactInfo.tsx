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
      languages: ['English', 'Hindi'],
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM IST'
    },
    {
      country: 'UAE',
      city: 'Dubai, United Arab Emirates',
      flag: '🇦🇪',
      email: 'uae@pakmake.com',
      phone: '+971 XXX XXX XXXX',
      address: 'Business Bay, Dubai - 00000',
      languages: ['English', 'Arabic'],
      hours: 'Sun-Thu: 9:00 AM - 6:00 PM GST'
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
                  <div className="text-primary-600 text-xl">📧</div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-primary-600 text-xl">📞</div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-primary-600 text-xl">📍</div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-primary-600 text-xl">🗣️</div>
                  <div>
                    <p className="font-medium text-gray-900">Languages</p>
                    <p className="text-gray-600">{office.languages.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-primary-600 text-xl">🕐</div>
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">{office.hours}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-primary-100 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-primary-700 font-medium">Interactive Map</p>
                <p className="text-sm text-primary-600">Click to view location</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Need Immediate Assistance?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600 mb-3">Available 24/7 for quick questions</p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Start Chat
                </button>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                <p className="text-sm text-gray-600 mb-3">Connect directly with our team</p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Message Us
                </button>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Line</h4>
                <p className="text-sm text-gray-600 mb-3">For urgent logistics support</p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
