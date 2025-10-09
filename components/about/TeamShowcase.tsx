'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, ArrowRight } from 'lucide-react'

export function TeamShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const team = [
    {
      name: 'Pramila Jaju',
      role: 'Co-Founder',
      bio: 'MA(English), BSC, BEED(English)',
      linkedin: '#'
    },
    {
      name: 'Sandeep Jaju',
      role: 'Founder',
      bio: 'BCOM, MBA',
      linkedin: '#'
    },
    {
      name: 'Pranav Jaju',
      role: 'Co-Founder',
      bio: 'BBA, MBA',
      linkedin: '#'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driven by passion for sustainability and innovation, our founders bring decades
            of experience in transforming traditional logistics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 mb-6">{member.bio}</p>

              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <span>Connect on LinkedIn</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}