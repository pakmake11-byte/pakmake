'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { StatsCounter } from '@/components/home/StatsCounter'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Leaf } from 'lucide-react'
import { BackgroundElements } from '../ui/BackgroundElements'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const
const CARD_TRANSITION = { duration: 0.9, ease: EASE_SMOOTH }

export function EnvironmentalImpact() {
  const sectionRef = useRef(null)
  const statsGridRef = useRef(null)

  const sectionInView = useInView(sectionRef, { once: false, margin: '-150px' })
  const statsGridInView = useInView(statsGridRef, { once: false, margin: '-150px' })
  const scrollDirection = useScrollDirection()

  const shouldAnimate = sectionInView && statsGridInView
  const directionY = scrollDirection === 1 ? 60 : -60
  const directionRotate = scrollDirection === 1 ? 12 : -12

  const impactStats = useMemo(
    () => [
      {
        title: 'Recycling Rate',
        value: 100,
        suffix: '%',
        icon: '♻️',
        description: 'Made from 100% recyclable kraft paper material.',
        gradient: 'from-[#60A5FA] to-[#2563EB]',
      },
      {
        title: 'Weight Reduction',
        value: 95,
        suffix: '%',
        icon: '🪶',
        description: 'Weighs 1/20th as much as wood pallets, reducing freight costs.',
        gradient: 'from-[#30A5CA] to-[#2563EB]',
      },
      {
        title: 'Increased Product Load',
        value: 15,
        suffix: '%',
        icon: '📦',
        description: 'Fit 12-15% more products per shipping container.',
        gradient: 'from-[#38BDF8] to-[#0284C7]',
      },
      {
        title: 'Warehouse Space Saved',
        value: 98,
        suffix: '%',
        icon: '🏢',
        description: 'Requires 98% less storage (1m³ for 1000 sheets vs 70m³ for 1000 pallets).',
        gradient: 'from-[#6EC1E4] to-[#0077B6]',
      },
      {
        title: 'Faster Loading Time',
        value: 60,
        suffix: '%',
        icon: '⏱️',
        description: 'Decrease loading and unloading times by up to 60%.',
        gradient: 'from-[#34D399] to-[#059669]',
      },
      {
        title: 'Chemical & Pest Free',
        value: 100,
        suffix: '%',
        icon: '🛡️',
        description: 'Exempt from phytosanitary restrictions. No fumigation or chemical treatment required.',
        gradient: 'from-[#10B981] to-[#047857]',
      },
    ],
    []
  )

  const cardVariants = {
    hidden: { opacity: 0, y: directionY, scale: 0.96, rotateX: directionRotate, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' },
  }

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white">
      <BackgroundElements isInView={sectionInView} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Environmental"
          highlightedText="Impact & Savings"
          subtitle="Our slip sheets deliver measurable environmental benefits and cost savings across your entire supply chain."
          isInView={sectionInView}
          icon={Leaf}
        />

        <div ref={statsGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              transition={{ ...CARD_TRANSITION, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, rotateY: 2, transition: { duration: 0.35 } }}
              className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-4 sm:p-6 hover:shadow-2xl transition-all"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center bg-linear-to-br ${stat.gradient}`}
                  initial={{ scale: 0.8, rotate: -560, opacity: 0 }}
                  animate={shouldAnimate ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.8, rotate: -560, opacity: 0 }}
                  whileHover={{ rotate: 360, scale: 1.15, transition: { duration: 0.6 } }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.2, ease: EASE_SMOOTH }}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.25, ease: EASE_SMOOTH }}
                >
                  <StatsCounter
                    value={shouldAnimate ? stat.value : 0}
                    suffix={stat.suffix}
                    className={`text-3xl sm:text-5xl font-bold bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </motion.div>
              </div>

              <motion.h3
                className="text-lg sm:text-xl font-bold text-[#003E5C] mb-2 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.35 }}
              >
                {stat.title}
              </motion.h3>

              <motion.p
                className="text-sm sm:text-base text-[#334155] leading-relaxed text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.45 }}
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