'use client'

import { useRef, memo, useState, useEffect } from 'react'
import { motion, Variants, useInView } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'

import { StatsCounter } from '@/components/home/StatsCounter'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import {
  scaleInVariants,
  createContainerVariants,
  statsPulseVariants
} from '@/lib/animations/variants'

const HERO_HEADLINES = ['Move More Products', 'More Economically']

// Fallback stats data
const FALLBACK_STATS = [
  { label: 'CO₂ Saved', value: 15240, suffix: ' tons' },
  { label: 'Storage Space Saved', value: 85, suffix: '%' },
  { label: 'Cost Savings Generated', value: 2.5, suffix: 'M $' },
  { label: 'Customers Served', value: 50, suffix: '+' }
]

interface StatData {
  label: string;
  value: number;
  suffix: string;
}

const textContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
}

const textItemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const containerVariants = createContainerVariants()

export const HeroSection = memo(function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: false })
  const [statsData, setStatsData] = useState<StatData[]>(FALLBACK_STATS)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats', {
          next: { revalidate: 86400 } // 24 hours
        })
        
        if (!response.ok) throw new Error('Failed to fetch stats')
        
        const data = await response.json()
        if (data.stats) {
          setStatsData(data.stats)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative bg-paper-texture overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Text Content */}
          <motion.div
            className='mt-6 sm:mt-12'
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textContainerVariants}
          >
            {HERO_HEADLINES.map((line, index) => (
              <motion.h1
                key={line}
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-[#003E5C] ${index && 'mb-4 sm:mb-6'} ${index === 0 ? 'mt-4 sm:mt-3 md:mt-4' : 'xl:mt-2'
                  } ${index === 1 ? 'bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent block' : ''
                  }`}
                variants={textItemVariants}
              >
                {line}
              </motion.h1>
            ))}

            <motion.p
              className="text-sm sm:text-lg md:text-xl lg:text-xl text-[#334155] mb-4 sm:mb-6 max-w-full sm:max-w-xl leading-relaxed text-justify"
              variants={textItemVariants}
            >
              Revolutionary slip sheet solutions that replace traditional wooden pallets,
              delivering 80% cost reduction and 100% sustainability.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 xl:mt-6"
              variants={textItemVariants}
            >
              <Link href="/contact" passHref>
                <motion.div
                  className="cursor-pointer bg-gradient-to-r from-[#00A0E3] to-[#007CB8] text-white px-8 sm:px-10 md:px-12 lg:px-5 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-[#007CB8] hover:to-[#005F8C] transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleInVariants}
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </Link>
              <motion.a
                href="/home/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#00A0E3] border-2 border-[#00A0E3] px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#E6F7FF] transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={scaleInVariants}
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Get Brochure
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <div className="hidden lg:block relative h-full w-full">
            <SlipSheetModel />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="sm:mt-2 lg:mt-4 xl:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statsPulseVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl border border-[#B3E5FC] flex items-center justify-center sm:flex-col text-center hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-base sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent"
              />
              <p className="text-base sm:text-lg md:text-base text-[#334155] ml-1 sm:ml-0 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-4 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#007CB8]"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'