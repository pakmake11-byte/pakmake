'use client'

import { useRef, memo } from 'react'
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
const STATS_DATA = [
  { label: 'CO₂ Saved', value: 15240, suffix: ' tons' },
  { label: 'Storage Space Saved', value: 85, suffix: '%' },
  { label: 'Cost Savings Generated', value: 2.5, suffix: 'M $' },
  { label: 'Customers Served', value: 50, suffix: '+' }
]

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-5rem)] bg-primary-50 overflow-hidden pt-10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className='mt-8'
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textContainerVariants}
          >
            {HERO_HEADLINES.map((line, index) => (
              <motion.h1
                key={line}
                className={`text-3xl sm:text-4xl mt-4 lg:text-5xl font-bold text-[#003E5C] ${
                  index && 'mb-6'
                } ${
                  index === 1 ? 'bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent block' : ''
                }`}
                variants={textItemVariants}
              >
                {line}
              </motion.h1>
            ))}

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-[#334155] mb-8 max-w-xl leading-relaxed text-justify"
              variants={textItemVariants}
            >
              Revolutionary slip sheet solutions that replace traditional wooden pallets,
              delivering 80% cost reduction and 100% sustainability.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 mb-12" variants={textItemVariants}>
              <Link href="/contact" passHref>
                <motion.div
                  className="cursor-pointer bg-gradient-to-r from-[#00A0E3] to-[#007CB8] text-white px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:from-[#007CB8] hover:to-[#005F8C] transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleInVariants}
                >
                  Request Quote
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>

              <motion.a
                href="/home/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#00A0E3] border-2 border-[#00A0E3] px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#E6F7FF] transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={scaleInVariants}
              >
                <FileText className="w-5 h-5" />
                Get Brochure
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative h-96 lg:h-full min-h-[450px]">
            <SlipSheetModel />
          </div>
        </div>

        <motion.div
          className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {STATS_DATA.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statsPulseVariants}
              className="bg-white rounded-2xl p-6 shadow-xl border border-[#B3E5FC] text-center hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -8 }}
            >
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent"
              />
              <p className="text-sm sm:text-base text-[#334155] mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center text-[#007CB8]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'