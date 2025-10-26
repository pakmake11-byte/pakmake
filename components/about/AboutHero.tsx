'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createDirectionalFadeVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatsDisplay } from './StatsDisplay'

const STATS = [
  { label: 'Est. 2021' },
  { label: '100+ Customers' },
  { label: '10+ Countries' }
]

export function AboutHero() {
  const { ref, isInView } = useInViewAnimation({ margin: '-50px' })
  const scrollDirection = useScrollDirection()
  const fadeVariants = useMemo(() => createDirectionalFadeVariants(scrollDirection), [scrollDirection])

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeVariants}
      className="py-20 sm:py-28 lg:py-40 bg-paper-texture"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Building2}
          title="About"
          highlightedText="PakMake Packaging Inc®"
          subtitle="Pioneering sustainable logistics solutions that transform how businesses handle materials while protecting our planet for future generations."
          isInView={isInView}
        />
        
        <StatsDisplay 
          stats={STATS} 
          isInView={isInView} 
          scrollDirection={scrollDirection}
        />
      </div>
    </motion.section>
  )
}