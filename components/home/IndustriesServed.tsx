'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cardVariants, createContainerVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Building2 } from 'lucide-react'

export function IndustriesServed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const industries = [
    { 
      name: 'Food & Beverage', 
      icon: '🍕', 
      description: 'Safe, hygienic handling',
      color: 'from-orange-400 to-orange-600'
    },
    { 
      name: 'Pharmaceuticals', 
      icon: '💊', 
      description: 'Clean room compatible',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      name: 'Export', 
      icon: '🚢', 
      description: 'International shipping',
      color: 'from-cyan-400 to-cyan-600'
    },
    { 
      name: 'Retail', 
      icon: '🛒', 
      description: 'Store-ready packaging',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      name: 'Automotive', 
      icon: '🚗', 
      description: 'Parts & components',
      color: 'from-red-400 to-red-600'
    },
    { 
      name: 'Electronics', 
      icon: '📱', 
      description: 'Static-free handling',
      color: 'from-indigo-400 to-indigo-600'
    },
    { 
      name: 'Chemicals', 
      icon: '🧪', 
      description: 'Resistant materials',
      color: 'from-green-400 to-green-600'
    },
    { 
      name: 'Paper & Pulp', 
      icon: '📰', 
      description: 'Industry expertise',
      color: 'from-amber-400 to-amber-600'
    }
  ]

  const containerVariants = createContainerVariants()

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[#E6F7FF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Icon */}
        <SectionHeader
          icon={Building2}
          title="Industries We"
          highlightedText="Serve"
          subtitle="Our slip sheet solutions are trusted across diverse industries worldwide"
          isInView={isInView}
        />

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#B3E5FC] group"
            >
              {/* Icon with hover animation */}
              <motion.div 
                className="relative mx-auto w-22 h-22 mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">{industry.icon}</span>
                </div>
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-[#003E5C] group-hover:text-[#00A0E3] transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm sm:text-base text-[#334155]">{industry.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}