'use client'

import React from 'react'
import Image from "next/image"
import { motion, useInView } from 'framer-motion'
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

type ClientLogo = {
  name: string
  filename: string
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

const clientLogos: ClientLogo[] = [
  { name: 'BRC', filename: 'BRC_low-wh.png' },
  { name: 'ITC', filename: 'itc.png' },
  { name: 'Kohinoor', filename: 'kohinor-logo.png' },
  { name: 'Olam Agri', filename: 'olamagri-primary-logo.webp' },
  { name: 'HOS', filename: 'hos_logo.5a9ee2a14f1eff257da8.png' },

  { name: 'ASDA', filename: 'ASDA.png' },
  { name: 'Costco', filename: 'Costco_1.png' },
  { name: 'Morrisons', filename: 'Morrisions.png' },
  { name: 'Sainsbury’s', filename: 'Sainsbury.png' },
  { name: 'Tesco', filename: 'Tesco_2.png' },
  { name: 'Walmart', filename: 'walmart_2.png' },
  { name: 'Woolworth', filename: 'Woolworth_2.png' },

  // Generic / unknown ones
  { name: 'Client Logo', filename: 'logo.png' },
  { name: 'Client Logo Alt', filename: 'logo (1).png' },
  { name: 'Client SVG', filename: 'logo (1).svg' },
  { name: 'Client SVG', filename: 'svgviewer-output.svg' },
  { name: 'Client SVG Alt', filename: 'svgviewer-output (1).svg' },
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

function ClientMarquee() {
  const duplicatedLogos = [...clientLogos, ...clientLogos]

  return (
    <div className="relative bg-primary-200/30 overflow-hidden py-8">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {duplicatedLogos.map((logo, index) => (
          <motion.div
            key={`${logo.filename}-${index}`}
            className="shrink-0 mx-4 sm:mx-6 lg:mx-8"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-28 h-16 sm:w-36 sm:h-20 lg:w-44 lg:h-24 flex items-center justify-center">
              <Image
                src={`/client/${logo.filename}`}
                alt={logo.name}
                fill
                className="object-contain duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
                sizes="(max-width: 768px) 120px, (max-width: 1200px) 160px, 200px"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  )
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

  useEffect(() => {
    if (!sectionVisible) setShouldAnimate(false)
  }, [sectionVisible])

  useEffect(() => {
    if (isInView && sectionVisible) setShouldAnimate(true)
  }, [isInView, sectionVisible])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: scrollDirection > 0 ? 60 : -60,
      scale: 0.95,
      rotateX: scrollDirection > 0 ? 8 : -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: (index % columns) * 0.18,
        ease: EASE_CUBIC,
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      whileHover={{ y: -8, scale: 1.02, rotateY: 2, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#E1F3FB] group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4"
        whileHover={{ rotate: 360, scale: 1.12, transition: { duration: 0.6 } }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl">{industry.icon}</span>
        </div>
      </motion.div>

      <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 transition-all duration-300">{industry.name}</h3>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_CUBIC }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-[#005F8C] mb-16 mt-24 text-center">
          Our Major Clients
        </h3>
        <ClientMarquee />
      </motion.div>

    </section>
  )
}
