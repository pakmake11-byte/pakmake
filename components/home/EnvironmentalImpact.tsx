'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { StatsCounter } from '@/components/home/StatsCounter'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cardVariants, createContainerVariants } from '@/lib/animations/variants'
import { Leaf } from 'lucide-react'
import { BackgroundElements } from '../ui/BackgroundElements'

export function EnvironmentalImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const impactStats = [
    {
      title: 'Freight Cost Savings',
      value: 40,
      suffix: '%',
      icon: '🚛',
      description: 'Reduced shipping costs due to lighter weight',
      gradient: 'from-[#80D4F8] to-[#4DC4F5]',
    },
    {
      title: 'CO₂ Reduction vs Plastic',
      value: 65,
      suffix: '%',
      icon: '🌱',
      description: 'Lower carbon footprint than plastic alternatives',
      gradient: 'from-[#10B981] to-[#059669]',
    },
    {
      title: 'CO₂ Reduction vs Wood',
      value: 85,
      suffix: '%',
      icon: '🌳',
      description: 'Significant reduction compared to wooden pallets',
      gradient: 'from-[#10B981] to-[#047857]',
    },
    {
      title: 'Recycling Rate',
      value: 100,
      suffix: '%',
      icon: '♻️',
      description: 'Fully recyclable kraft paper material',
      gradient: 'from-[#00A0E3] to-[#007CB8]',
    },
    {
      title: 'Container Space Saved',
      value: 70,
      suffix: '%',
      icon: '📦',
      description: 'More products per container shipment',
      gradient: 'from-[#4DC4F5] to-[#00A0E3]',
    },
    {
      title: 'Weight Reduction',
      value: 95,
      suffix: '%',
      icon: '⚖️',
      description: 'Dramatically lighter than wooden pallets',
      gradient: 'from-[#007CB8] to-[#005F8C]',
    },
  ]

  const containerVariants = createContainerVariants()

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Animated Background */}
      <BackgroundElements isInView={isInView} />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title="Environmental"
          highlightedText="Impact & Savings"
          subtitle="Our slip sheets deliver measurable environmental benefits and cost savings across your entire supply chain."
          isInView={isInView}
          icon={Leaf}
        />

        {/* Stats Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {impactStats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-4 sm:p-6 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient}`}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </div>

                <StatsCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className={`text-3xl sm:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#003E5C] mb-2 text-center">
                {stat.title}
              </h3>

              <p className="text-sm sm:text-base text-[#334155] leading-relaxed text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
