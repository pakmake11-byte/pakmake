'use client'

import { motion, useInView } from 'framer-motion'
import { type Variants, type Easing } from "framer-motion"

import { useRef } from 'react'
import { User, ArrowRight } from 'lucide-react'

const cubicBezier: Easing = [0.65, 0, 0.35, 1]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.9,
      ease: cubicBezier
    }
  }
}

export function TeamShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

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
      linkedin: 'https://www.linkedin.com/in/sandeep-jaju-b8a3743a/'
    },
    {
      name: 'Pranav Jaju',
      role: 'Co-Founder',
      bio: 'BBA, MBA',
      linkedin: '#'
    }
  ]

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Leadership Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Driven by passion for sustainability and innovation, our founders bring decades
            of experience in transforming traditional logistics.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/30 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 200,
                    delay: 0.4 + index * 0.1
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                >
                  <User className="w-12 h-12 text-blue-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">{member.role}</p>
                <p className="text-gray-600 mb-6 text-base">{member.bio}</p>

                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}