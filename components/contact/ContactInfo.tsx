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
      email: 'sandeepjaju@yahoo.com',
      phone: '+91 98291-87167',
      address: 'Plt. 52, Soni Ka Bagh, Behind Alka Cinema, Sikar Road, Jaipur-302039 (Rajasthan)',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.178212556248!2d75.7718!3d26.9482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6f3cb0d52d7%3A0xa5c5e8e7d5432f0e!2sAlka%20Cinema!5e0!3m2!1sen!2sin!4v1697041234567!5m2!1sen!2sin'
    },
    {
      country: 'UAE',
      city: 'Ajman, United Arab Emirates',
      flag: '🇦🇪',
      email: 'sandeepjaju@yahoo.com',
      phone: '+971 558570247',
      address: '308, Garden City, Jurf, Ajman, UAE',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.0102048171023!2d55.4820!3d25.4112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f72e2a4e7ef9%3A0x37b55c123d6f7f2b!2sGarden%20City%20Residences!5e0!3m2!1sen!2sae!4v1697044567890!5m2!1sen!2sae'
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
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{office.flag}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{office.country} Office</h3>
                  <p className="text-primary-600">{office.city}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{office.email}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{office.phone}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{office.address}</p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src={office.mapSrc}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
