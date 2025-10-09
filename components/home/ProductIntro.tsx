'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, Suspense, useState, useEffect } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'

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
  const variants = {
    hidden: { opacity: 0, x: align === 'right' ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay }}
      className={`relative flex items-center gap-4 w-full ${
        align === 'right' ? 'flex-row-reverse text-right' : 'text-left'
      }`}
    >
      {/* Label */}
      <div className="flex-grow">
        <p className="text-lg font-semibold text-gray-800">{label}</p>
      </div>

      {/* Connector Dot + Line */}
      <div
        className={`absolute top-1/2 h-[2px] bg-gray-400 ${
          align === 'right' ? 'right-full w-16' : 'left-full w-16'
        }`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-700 ${
            align === 'right' ? '-right-1' : '-left-1'
          }`}
        />
      </div>
    </motion.div>
  )
}

export function ProductIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const features = [
    { label: 'Durable & Puncture Resistant' },
    { label: '100% Virgin Kraft Board' },
    // { label: 'SFI standards' },
    { label: 'No Maintenance' },
    { label: 'High Tensile Strength' },
    { label: 'Custom Sizes Available' },
    { label: '12-15% More Products/Load' },
    { label: '60% - 75% Cost Reduction' },
    { label: '100% Recyclable' },
    { label: '60% Faster Loading' },
    { label: '1/20th Weight of Wood Pallets' },
  ]

  // Split features for left and right columns
  const midIndex = Math.ceil(features.length / 2)
  const leftFeatures = features.slice(0, midIndex)
  const rightFeatures = features.slice(midIndex)

  return (
    <section ref={ref} className="pt-24 pb-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 my-6">
            Why Choose Slip Sheets?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a paradigm shift in logistics. Our slip sheets outperform
            traditional pallets in every key metric.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-[1fr_auto_1fr] md:grid-cols-[2fr_3fr_2fr] gap-x-4 lg:gap-x-8 items-center">
          {/* Left Column */}
          <div className="space-y-10">
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

          {/* Center Column - 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[350px] sm:h-[450px] w-full px-4"
          >
            <Suspense
              fallback={
                <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
              }
            >
              <SlipSheetModel />
            </Suspense>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-10">
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
        </div>
      </div>
    </section>
  )
}
