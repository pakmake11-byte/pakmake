'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, Suspense, useState, useEffect } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'

const FeaturePoint = ({
  label,
  icon,
  align,
  delay,
  isInView,
}: {
  label: string
  icon: string
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
      className={`flex items-center gap-4 w-full ${
        align === 'right' ? 'flex-row-reverse text-right' : 'text-left'
      }`}
    >
      <div className="flex-grow">
        <p className="text-lg text-gray-800">{label}</p>
      </div>
      <div className="text-2xl flex-shrink-0">{icon}</div>
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
    { label: 'Durable & Puncture Resistant', icon: '🛡️' },
    { label: 'High Tensile Strength', icon: '💪' },
    { label: '100% Virgin Kraft Board', icon: '🌱' },
    { label: 'SFI standards', icon: '' },
    { label: 'No Maintenance', icon: '🔧' },
    { label: 'Custom Sizes Available', icon: '📐' },
    { label: '100% Recyclable', icon: '♻️' },
    { label: '60% - 75% Cost Reduction', icon: '💰' },
    { label: '12-15% More Products/Load', icon: '📦' },
    { label: '1/20th Weight of Wood Pallets', icon: '⚖️' },
    { label: '60% Faster Loading', icon: '⚡' },
  ]

  // Split features for left and right columns
  const midIndex = Math.ceil(features.length / 2)
  const leftFeatures = features.slice(0, midIndex)
  const rightFeatures = features.slice(midIndex)

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl  font-bold text-gray-900 my-6">
            Why Choose Slip Sheets?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a paradigm shift in logistics. Our slip sheets outperform
            traditional pallets in every key metric.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-[1fr_auto_1fr] md:grid-cols-[2fr_3fr_2fr] gap-x-8 lg:gap-x-12 items-center">
          {/* Left Column */}
          <div className="space-y-10">
            {leftFeatures.map((feature, index) => (
              <FeaturePoint
                key={feature.label}
                {...feature}
                align="right"
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
                align="left"
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