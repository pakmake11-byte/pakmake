'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_CUBIC } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Building2 } from 'lucide-react'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

function useResponsiveColumns() {
  const [cols, setCols] = useState(5)

  useEffect(() => {
    const updateCols = () => {
      if (window.matchMedia('(max-width: 640px)').matches) setCols(1)
      else if (window.matchMedia('(max-width: 1024px)').matches) setCols(2)
      else setCols(5)
    }

    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  return cols
}

function IndustryCard({ industry, index, scrollDirection, columns }: { 
  industry: any
  index: number
  scrollDirection: number
  columns: number
}) {
  const cardRef = useRef(null)
  const isCardInView = useInView(cardRef, { 
    once: false, 
    margin: '-10% 0px -10% 0px',
    amount: 0.3 
  })

  const rowIndex = Math.floor(index / columns)

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: scrollDirection > 0 ? 80 : -80, // move according to scroll
      z: -120, // come from behind the screen
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      z: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: rowIndex * 0.1 + (index % columns) * 0.04, // stagger by row and within row
        ease: EASE_CUBIC
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isCardInView ? 'visible' : 'hidden'}
      whileHover={{ y: -8, scale: 1.02, z: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#B3E5FC] group"
    >
      {/* Icon */}
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
  )
}

export function IndustriesServed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()
  const columns = useResponsiveColumns()

const industries = [
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
  { name: 'Dairy', icon: '🧀', description: 'Milk & dairy products', color: 'from-blue-300 to-blue-500' }
]

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Building2}
          title="Industries We"
          highlightedText="Serve"
          subtitle="Our slip sheet solutions are trusted across diverse industries worldwide"
          isInView={isInView}
        />

        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8"
          style={{ transformStyle: 'preserve-3d', perspective: 1500 }}
        >
          {industries.map((industry, index) => (
            <IndustryCard 
              key={industry.name} 
              industry={industry} 
              index={index}
              scrollDirection={scrollDirection}
              columns={columns}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
