'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import {
  connectorLineVariants,
} from '@/lib/animations/variants'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { BackgroundElements } from '../ui/BackgroundElements'
import { Boxes } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

// === FeaturePoint Component ===
const FeaturePoint = ({
  label,
  align,
}: {
  label: string
  align: 'left' | 'right'
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, x: align === 'right' ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      className={`relative flex items-center gap-4 w-full ${
        align === 'right' ? 'flex-row-reverse text-right' : 'text-left'
      }`}
    >
      <div className="flex-grow bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-[#B3E5FC]">
        <div
          className={`flex items-center gap-3 ${
            align === 'right' ? 'flex-row-reverse' : ''
          }`}
        >
          <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full flex-shrink-0"></div>
          <p className="text-base lg:text-lg font-semibold text-[#003E5C]">
            {label}
          </p>
        </div>
      </div>

      {/* Connector Line */}
      <motion.div
        className={`absolute top-1/2 h-[3px] ${
          align === 'right'
            ? 'right-full bg-gradient-to-l from-[#80D4F8] to-transparent'
            : 'left-full bg-gradient-to-r from-[#80D4F8] to-transparent'
        } w-8 lg:w-16`}
        variants={connectorLineVariants(align)}
      />
    </motion.div>
  )
}

// === ProductIntro Section ===
export const ProductIntro = function ProductIntro() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  const features = [
    { label: 'Durable & Puncture Resistant' },
    { label: '100% Virgin Kraft Board' },
    { label: 'No Maintenance Required' },
    { label: 'High Tensile Strength' },
    { label: 'Custom Sizes Available' },
    { label: '12-15% More Products/Load' },
    { label: '60-75% Cost Reduction' },
    { label: '100% Recyclable Material' },
    { label: '60% Faster Loading Time' },
    { label: '1/20th Weight of Wood Pallets' },
  ]

  const midIndex = Math.ceil(features.length / 2)
  const leftFeatures = features.slice(0, midIndex)
  const rightFeatures = features.slice(midIndex)

  // === Master container with global stagger ===
  const masterContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // 👈 Controls spacing between point animations
        delayChildren: 0.2,    // 👈 Delay before first point
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Animated Background */}
      <BackgroundElements isInView={isInView} />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeader
          icon={Boxes}
          title="Why Choose"
          highlightedText="Slip Sheets?"
          subtitle="Experience a paradigm shift in logistics. Our slip sheets outperform traditional pallets in every key metric."
          isInView={isInView}
          iconGradient="from-[#E0F7FA] to-[#B3E5FC]"
        />

        {/* Master animation container */}
        <motion.div
          variants={masterContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-[1fr_auto_1fr] md:grid-cols-[2fr_3fr_2fr] gap-x-4 lg:gap-x-8 items-center"
        >
          {/* Left Feature List */}
          <div className="space-y-6 lg:space-y-8">
            {leftFeatures.map((feature) => (
              <FeaturePoint key={feature.label} {...feature} align="left" />
            ))}
          </div>

          {/* Center 3D Model */}
          <div className="relative h-96 lg:h-full max-h-[400px] flex items-center justify-center">
            <SlipSheetModel />
          </div>

          {/* Right Feature List */}
          <div className="space-y-6 lg:space-y-8">
            {rightFeatures.map((feature) => (
              <FeaturePoint key={feature.label} {...feature} align="right" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
