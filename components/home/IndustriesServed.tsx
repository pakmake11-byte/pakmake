'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_CUBIC } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Building2 } from 'lucide-react'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

type Industry = {
  name: string
  icon: string
  description: string
  color: string
}

const industries: Industry[] = [
  { name: 'Textiles', icon: '🧵', description: 'Fabric & garment transport', color: 'from-pink-400 to-pink-600' },
  { name: 'Home Decor', icon: '🏠', description: 'Furniture & accessories', color: 'from-amber-400 to-amber-600' },
  { name: 'Handicraft', icon: '🎨', description: 'Artisan products', color: 'from-purple-400 to-purple-600' },
  { name: 'Glass', icon: '🪟', description: 'Fragile item handling', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Dry Foods', icon: '🌾', description: 'Grains & pulses', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Packed Foods', icon: '📦', description: 'Ready-to-ship products', color: 'from-orange-400 to-orange-600' },
  { name: 'Chemical', icon: '🧪', description: 'Industrial chemicals', color: 'from-green-400 to-green-600' },
  { name: 'Export Shipping', icon: '🚢', description: 'International logistics', color: 'from-blue-400 to-blue-600' },
  { name: 'Rice', icon: '🍚', description: 'Bulk grain transport', color: 'from-lime-400 to-lime-600' },
  { name: 'FMCG', icon: '🛒', description: 'Consumer goods', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Pharmaceutical', icon: '💊', description: 'Medical products', color: 'from-red-400 to-red-600' },
  { name: 'Electronics', icon: '📱', description: 'Tech components', color: 'from-violet-400 to-violet-600' },
  { name: 'Beverage', icon: '🥤', description: 'Drinks & beverages', color: 'from-rose-400 to-rose-600' },
  { name: 'Spice', icon: '🌶️', description: 'Spice products', color: 'from-orange-500 to-red-600' },
  { name: 'Dairy', icon: '🧀', description: 'Milk & dairy products', color: 'from-blue-300 to-blue-500' },
]

function useResponsiveColumns() {
  const [cols, setCols] = useState(5)

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth
      if (width <= 640) setCols(1)
      else if (width <= 1024) setCols(2)
      else setCols(5)
    }

    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  return cols
}

function IndustryCard({
  industry,
  index,
  scrollDirection,
  columns,
  sectionVisible,
}: {
  industry: Industry
  index: number
  scrollDirection: number
  columns: number
  sectionVisible: boolean
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, margin: '-150px 0px -150px 0px' })
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // Reset cards when section leaves view
  useEffect(() => {
    if (!sectionVisible) setShouldAnimate(false)
  }, [sectionVisible])

  // Trigger animation when card re-enters view (and section is visible)
  useEffect(() => {
    if (isInView && sectionVisible) setShouldAnimate(true)
  }, [isInView, sectionVisible])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: scrollDirection > 0 ? 60 : -60,
      scale: 0.9,
      rotateX: scrollDirection > 0 ? 10 : -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: (index % columns) * 0.4,
        ease: EASE_CUBIC,
      },
    },
  }

  const shineVariants: Variants = {
    hidden: { backgroundPosition: '150% 50%' },
    visible: {
      backgroundPosition: '-50% 50%',
      transition: {
        duration: 4,
        delay: (index % columns) * 0.4,
        ease: 'easeIn',
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateY: 3,
        transition: { duration: 0.3 },
      }}
      className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#B3E5FC] group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4"
        whileHover={{
          rotate: 360,
          scale: 1.15,
          transition: { duration: 0.6 },
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${industry.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl">{industry.icon}</span>
        </div>
      </motion.div>

      <motion.h3
        variants={shineVariants}
        className="text-base sm:text-lg lg:text-xl font-bold mb-2 
                   bg-clip-text text-transparent bg-[length:250%_100%] 
                   bg-[linear-gradient(90deg,_#003E5C_40%,_white_50%,_#003E5C_60%)] 
                   group-hover:bg-[linear-gradient(90deg,_#00A0E3,_#00A0E3)] 
                   transition-all duration-300"
      >
        {industry.name}
      </motion.h3>
      <p className="text-xs sm:text-sm text-[#334155]">{industry.description}</p>
    </motion.div>
  )
}

export function IndustriesServed() {
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()
  const columns = useResponsiveColumns()

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Building2}
          title="Industries We"
          highlightedText="Serve"
          subtitle="Our slip sheet solutions are trusted across diverse industries worldwide"
          isInView={sectionInView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={index}
              scrollDirection={scrollDirection}
              columns={columns}
              sectionVisible={sectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}