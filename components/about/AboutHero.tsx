'use client'

import { Building2 } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatsDisplay } from './StatsDisplay'

const STATS = [
  { label: 'Est. 2021' },
  { label: '50+ Customers' },
  { label: '10+ Countries' }
]

export function AboutHero() {
  const { ref, isInView } = useInViewAnimation()
  const scrollDirection = useScrollDirection()

  return (
    <section 
      ref={ref}
      className="py-20 sm:py-24 lg:py-32 bg-primary-50"
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
    </section>
  )
}