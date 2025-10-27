'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { StatsCounter } from '@/components/home/StatsCounter'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Leaf } from 'lucide-react'
import { BackgroundElements } from '../ui/BackgroundElements'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

const EASE_CUBIC = [0.65, 0, 0.35, 1] as const
const CARD_TRANSITION = { duration: 0.7, ease: EASE_CUBIC }

export function EnvironmentalImpact() {
  const sectionRef = useRef(null)
  const statsGridRef = useRef(null)

  const sectionInView = useInView(sectionRef, { once: false, margin: '-100px' })
  const statsGridInView = useInView(statsGridRef, { once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()

  const shouldAnimate = sectionInView && statsGridInView
  const directionY = scrollDirection === 1 ? 60 : -60
  const directionRotate = scrollDirection === 1 ? 15 : -15

  const impactStats = useMemo(
    () => [
      {
        title: 'Freight Cost Savings',
        value: 40,
        suffix: '%',
        icon: '🚛',
        description: 'Reduced shipping costs due to lighter weight',
        gradient: 'from-[#6EC1E4] to-[#0077B6]',
      },
      {
        title: 'CO₂ Reduction vs Plastic',
        value: 65,
        suffix: '%',
        icon: '🌱',
        description: 'Lower carbon footprint than plastic alternatives',
        gradient: 'from-[#34D399] to-[#059669]',
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
        gradient: 'from-[#60A5FA] to-[#2563EB]',
      },
      {
        title: 'Container Space Saved',
        value: 70,
        suffix: '%',
        icon: '📦',
        description: 'More products per container shipment',
        gradient: 'from-[#38BDF8] to-[#0284C7]',
      },
      {
        title: 'Weight Reduction',
        value: 95,
        suffix: '%',
        icon: '⚖️',
        description: 'Dramatically lighter than wooden pallets',
        gradient: 'from-[#5A2BA1] to-[#1E3A8A]'
      },
    ],
    []
  )


  const cardVariants = {
    hidden: { opacity: 0, y: directionY, scale: 0.9, rotateX: directionRotate },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white"
    >
      <BackgroundElements isInView={sectionInView} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Environmental"
          highlightedText="Impact & Savings"
          subtitle="Our slip sheets deliver measurable environmental benefits and cost savings across your entire supply chain."
          isInView={sectionInView}
          icon={Leaf}
        />

        <div
          ref={statsGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              transition={{ ...CARD_TRANSITION, delay: index * 0.12 }}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotateY: 3,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-4 sm:p-6 hover:shadow-2xl transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Icon + Counter */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    shouldAnimate ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12 + 0.2,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ rotate: 360, scale: 1.15, transition: { duration: 0.6 } }}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
                >
                  <StatsCounter
                    value={shouldAnimate ? stat.value : 0}
                    suffix={stat.suffix}
                    className={`text-3xl sm:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </motion.div>
              </div>

              {/* Title */}
              <motion.h3
                className="text-lg sm:text-xl font-bold text-[#003E5C] mb-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.12 + 0.4 }}
              >
                {stat.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base text-[#334155] leading-relaxed text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.12 + 0.5 }}
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
