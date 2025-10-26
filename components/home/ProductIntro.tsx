'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import {
  fadeInUpVariants,
  createContainerVariants,
  connectorLineVariants,
} from '@/lib/animations/variants'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { BackgroundElements } from '../ui/BackgroundElements'

const FeaturePoint = ({
  label,
  align,
  delay,
  isInView,
}: {
  label: string
  align: 'left' | 'right'
  delay: number
  isInView: boolean
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, x: align === 'right' ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
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
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />
    </motion.div>
  )
}

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

  const containerVariants = createContainerVariants()

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
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003E5C] mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent">
              Slip Sheets
            </span>
            ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#334155] max-w-3xl mx-auto leading-relaxed text-center">
            Experience a paradigm shift in logistics. Our slip sheets outperform
            traditional pallets in every key metric.
          </p>
        </motion.div>

        {/* 3-Column Layout */}
        <motion.div
          className="relative grid grid-cols-[1fr_auto_1fr] md:grid-cols-[2fr_3fr_2fr] gap-x-4 lg:gap-x-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left Feature List */}
          <div className="space-y-6 lg:space-y-8">
            {leftFeatures.map((feature, index) => (
              <FeaturePoint
                key={feature.label}
                {...feature}
                align="left"
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Center 3D Model */}
          <div className="relative h-96 lg:h-full max-h-[400px] flex items-center justify-center">
            <SlipSheetModel />
          </div>

          {/* Right Feature List */}
          <div className="space-y-6 lg:space-y-8">
            {rightFeatures.map((feature, index) => (
              <FeaturePoint
                key={feature.label}
                {...feature}
                align="right"
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}