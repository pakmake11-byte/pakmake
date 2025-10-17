'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function CompanyMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const values = [
    {
      title: 'Innovation',
      description: 'Continuously developing cutting-edge solutions that challenge traditional logistics methods.',
      icon: '💡'
    },
    {
      title: 'Sustainability',
      description: 'Committed to 100% recyclable materials and reducing environmental impact across supply chains.',
      icon: '🌱'
    },
    {
      title: 'Partnership',
      description: 'Working closely with clients to optimize their unique material handling processes.',
      icon: '🤝'
    },
    {
      title: 'Excellence',
      description: 'Delivering superior quality products with custom specifications and technical expertise.',
      icon: '⭐'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              PakMake Packaging Inc® specializes in providing innovative, sustainable alternatives 
              to traditional wooden pallets. We work closely with clients to redesign, add value, 
              and optimize their material handling processes through our durable kraft paper slip sheets.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600 mb-6">
              Our commitment extends beyond just supplying products – we partner with businesses 
              to transform their logistics operations. By replacing conventional pallets with our 
              lightweight, cost-effective slip sheets, we help companies achieve significant savings 
              while reducing their environmental footprint.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose PakMake</h3>
            <p className="text-lg text-gray-600">
              With expertise in custom sizing, technical specifications, and industry-specific 
              requirements, we ensure that every slip sheet solution is tailored to maximize 
              efficiency and minimize costs. Our sustainable approach, using 100% recyclable 
              kraft paper from certified forests, aligns with modern corporate responsibility goals.
            </p>
          </motion.div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
              >
                <div className="text-3xl">{value.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
