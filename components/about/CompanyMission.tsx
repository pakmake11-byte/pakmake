'use client'

import { motion, useInView } from 'framer-motion'
import { type Variants, type Easing } from "framer-motion"
import { useRef } from 'react'
import { Lightbulb, Leaf, Handshake, Star } from 'lucide-react'

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

const itemVariants: Variants = {
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

export function CompanyMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const values = [
    {
      title: 'Innovation',
      description: 'Continuously developing cutting-edge solutions that challenge traditional logistics methods.',
      icon: Lightbulb,
      gradient: 'from-yellow-100 to-yellow-200'
    },
    {
      title: 'Sustainability',
      description: 'Committed to 100% recyclable materials and reducing environmental impact across supply chains.',
      icon: Leaf,
      gradient: 'from-green-100 to-green-200'
    },
    {
      title: 'Partnership',
      description: 'Working closely with clients to optimize their unique material handling processes.',
      icon: Handshake,
      gradient: 'from-blue-100 to-blue-200'
    },
    {
      title: 'Excellence',
      description: 'Delivering superior quality products with custom specifications and technical expertise.',
      icon: Star,
      gradient: 'from-purple-100 to-purple-200'
    }
  ]

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              PakMake Packaging Inc® specializes in providing innovative, sustainable alternatives 
              to traditional wooden pallets. We work closely with clients to redesign, add value, 
              and optimize their material handling processes through our durable kraft paper slip sheets.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-700 mb-8">
              Our commitment extends beyond just supplying products – we partner with businesses 
              to transform their logistics operations. By replacing conventional pallets with our 
              lightweight, cost-effective slip sheets, we help companies achieve significant savings 
              while reducing their environmental footprint.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose PakMake</h3>
            <p className="text-lg text-gray-700">
              With expertise in custom sizing, technical specifications, and industry-specific 
              requirements, we ensure that every slip sheet solution is tailored to maximize 
              efficiency and minimize costs. Our sustainable approach, using 100% recyclable 
              kraft paper from certified forests, aligns with modern corporate responsibility goals.
            </p>
          </motion.div>

          {/* Right Content - Values Cards */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/30 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative p-6 flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        type: "spring", 
                        stiffness: 200,
                        delay: 0.4 + index * 0.1
                      }}
                      className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-base text-gray-700">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}