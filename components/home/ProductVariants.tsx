'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, memo } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Package2 } from 'lucide-react'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { BackgroundElements } from '../ui/BackgroundElements'
import React from 'react'

type SlipSheetVariant =
  | 'single-lip'
  | 'double-lip-opposite'
  | 'double-lip-adjacent'
  | 'multi-lip'

const EASE_CUBIC = [0.65, 0, 0.35, 1] as const

type CombinationLockCellProps = {
  children: React.ReactNode
  isInView: boolean
  delay: number
  className?: string
}

const CombinationLockCell = memo(function CombinationLockCell({
  children,
  isInView,
  delay,
  className
}: CombinationLockCellProps) {
  const [displayValue, setDisplayValue] = useState('')
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const getTextFromChildren = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>
      return getTextFromChildren(element.props.children)
    }
    if (Array.isArray(node)) {
      return node.map(getTextFromChildren).join('')
    }
    return ''
  }
  
  const targetText = getTextFromChildren(children)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (!isInView) {
      setDisplayValue('')
      return
    }

    timeoutRef.current = window.setTimeout(() => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*'
      const duration = 600
      const steps = 20
      const stepDuration = duration / steps
      let currentStep = 0

      intervalRef.current = window.setInterval(() => {
        if (currentStep < steps) {
          const progress = currentStep / steps
          const revealedLength = Math.floor(targetText.length * progress)

          let newValue = ''
          for (let i = 0; i < targetText.length; i++) {
            if (i < revealedLength) {
              newValue += targetText[i]
            } else {
              newValue += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          setDisplayValue(newValue)
          currentStep++
        } else {
          setDisplayValue(targetText)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }, stepDuration)
    }, delay * 1000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isInView, delay, targetText])

  const cloneWithText = (node: React.ReactNode, text: string): React.ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      return text
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>
      return React.cloneElement(
        element,
        {},
        cloneWithText(element.props.children, text)
      )
    }
    return node
  }

  const content = cloneWithText(children, displayValue || targetText)

  return (
    <motion.td
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {content}
    </motion.td>
  )
})

const variants = [
  { id: 'single-lip', title: 'Single-Lip', description: 'Access from one side' },
  {
    id: 'double-lip-opposite',
    title: 'Double-Lip (Opposite)',
    description: 'Access from two opposite sides',
  },
  {
    id: 'double-lip-adjacent',
    title: 'Double-Lip (Adjacent)',
    description: 'Access from two adjacent sides',
  },
  {
    id: 'multi-lip',
    title: 'Multi-Lip',
    description: 'Access from all four sides',
  },
]

const dimensionsTable = [
  { label: 'Length (L) - Standard', value: '1000/1200/800 mm' },
  { label: 'Length (L) - Alternative', value: 'Optional up to 1500 mm' },
  { label: 'Channelling (CL) - Standard', value: '50/75/100 mm' },
  { label: 'Width (W) - Standard', value: '1000/1200/800 mm' },
  { label: 'Width (W) - Alternative', value: 'Optional up to 1500 mm' },
  { label: 'Channelling (CW) - Standard', value: '50/75/100 mm' },
]

const thicknessTable = [
  { thickness: '0.8 mm', pulling: 'Up to 800 kg' },
  { thickness: '0.9 mm', pulling: 'Up to 1,200 kg' },
  { thickness: '1.0 mm', pulling: 'Up to 1,500 kg' },
  { thickness: '1.2 mm', pulling: 'Up to 1,900 kg' },
  { thickness: '1.5 mm', pulling: 'Up to 2,200 kg' },
  { thickness: '1.8 mm', pulling: 'Up to 2,700 kg' },
  { thickness: '2.0 mm', pulling: 'Up to 3,200 kg' },
]

const comparisonData: {
  attribute: string
  kraft: string
  plastic: string
}[] = [
  {
    attribute: 'Primary Use',
    kraft: 'Export Shipments',
    plastic: 'Export & Internal Warehouse',
  },
  {
    attribute: 'Cost Range',
    kraft: '₹250-400 per sheet',
    plastic: '₹300-500 per sheet',
  },
  {
    attribute: 'Load Capacity',
    kraft: '800-2000 Kg',
    plastic: '800-3500 Kg',
  },
  {
    attribute: 'Reusability',
    kraft: '4 - 5 Times',
    plastic: '50-100 times',
  },
  {
    attribute: 'Moisture Resistance',
    kraft: 'Limited',
    plastic: 'Excellent',
  },
  {
    attribute: 'Storage Duration',
    kraft: 'Up to 3 Months',
    plastic: 'Unlimited',
  },
  {
    attribute: 'Cost Saving',
    kraft: '60-65%',
    plastic: '70-75%',
  },
  {
    attribute: 'Recyclable',
    kraft: '100% Recyclable',
    plastic: '100% Recyclable',
  },
]

export function ProductVariants() {
  const { ref, isInView } = useInViewAnimation({ once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()
  const directionNum: number =
    typeof scrollDirection === 'number'
      ? scrollDirection
      : scrollDirection === 'down'
        ? 1
        : -1

  const [selectedVariant, setSelectedVariant] =
    useState<SlipSheetVariant>('multi-lip')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, when: 'beforeChildren' },
    },
    exit: { opacity: 0 },
  }

  const getItemVariants = (direction: number) => ({
    hidden: { opacity: 0, y: direction === 1 ? 36 : -36, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.95, ease: EASE_CUBIC },
    },
    exit: {
      opacity: 0,
      y: direction === 1 ? -28 : 28,
      transition: { duration: 0.7, ease: EASE_CUBIC },
    },
  })

  const comparisonTableRef = useRef<HTMLDivElement | null>(null)
  const dimensionsTableRef = useRef<HTMLTableElement | null>(null)
  const thicknessTableRef = useRef<HTMLTableElement | null>(null)

  const isComparisonInView = useInView(comparisonTableRef, {
    once: false,
    margin: '-40px',
  })
  const isDimensionsInView = useInView(dimensionsTableRef, {
    once: false,
    margin: '-40px',
  })
  const isThicknessInView = useInView(thicknessTableRef, {
    once: false,
    margin: '-40px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <BackgroundElements isInView={isInView} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Package2}
          title="Product Variants"
          highlightedText="& Specifications"
          subtitle="Choose from multiple configurations and materials to match your specific handling requirements"
          isInView={isInView}
        />

        {/* Material Comparison */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          exit="exit"
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#005F8C] mb-6 sm:mb-8 text-center">
            Material Comparison
          </h3>

          <div
            ref={comparisonTableRef}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#B3E5FC]"
          >
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[640px]" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '33.33%' }} />
                  <col style={{ width: '33.33%' }} />
                  <col style={{ width: '33.34%' }} />
                </colgroup>
                <thead>
                  <tr className="bg-[#00A0E3]">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-bold text-white text-sm sm:text-base">
                      Specifications
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-bold text-white text-sm sm:text-base">
                      Kraft Paper Slip Sheet
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-bold text-white text-sm sm:text-base">
                      PP Plastic Slip Sheet
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonData.map((row, index) => {
                    const cellDelay = 0.15
                    const rowDelay = index * (cellDelay * 3 + 0.1)

                    return (
                      <motion.tr
                        key={row.attribute}
                        whileHover={{
                          backgroundColor: '#F0FBFF',
                          transition: { duration: 0.2 }
                        }}
                        className={`border-t border-[#E6F7FF] ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                        } transition-colors duration-200`}
                      >
                        <CombinationLockCell
                          isInView={isComparisonInView}
                          delay={rowDelay}
                          className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-[#334155] text-xs sm:text-sm"
                        >
                          {row.attribute}
                        </CombinationLockCell>
                        <CombinationLockCell
                          isInView={isComparisonInView}
                          delay={rowDelay + cellDelay}
                          className="px-4 sm:px-6 py-3 sm:py-4 text-center"
                        >
                          <span className="inline-block font-bold text-[#005F8C] text-xs sm:text-sm bg-[#E6F7FF] px-2 py-1 rounded min-w-[100px]">
                            {row.kraft}
                          </span>
                        </CombinationLockCell>
                        <CombinationLockCell
                          isInView={isComparisonInView}
                          delay={rowDelay + cellDelay * 2}
                          className="px-4 sm:px-6 py-3 sm:py-4 text-center"
                        >
                          <span className="inline-block font-medium text-slate-700 text-xs sm:text-sm  min-w-[100px]">
                            {row.plastic}
                          </span>
                        </CombinationLockCell>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Sheet Configurations */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#005F8C] mb-8 text-center">
            Sheet Configurations
          </h3>

          {/* Variant Buttons and Model Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                {variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    variants={getItemVariants(directionNum)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setSelectedVariant(variant.id as SlipSheetVariant)
                    }
                    className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 group overflow-hidden ${
                      selectedVariant === variant.id
                        ? 'bg-linear-to-br from-[#00A0E3] to-[#007CB8] text-white shadow-xl'
                        : 'bg-white text-[#334155] hover:shadow-lg border-2 border-[#B3E5FC]'
                    }`}
                  >
                    <div className="relative z-10 text-left">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-xl sm:text-2xl leading-tight">
                          {variant.title}
                        </h4>
                        <AnimatePresence>
                          {selectedVariant === variant.id && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 24,
                                mass: 0.6,
                              }}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                            >
                              <svg
                                className="w-4 h-4 text-[#00A0E3]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p
                        className={`text-sm mb-4 ${
                          selectedVariant === variant.id
                            ? 'text-[#E6F7FF]'
                            : 'text-[#334155]'
                        }`}
                      >
                        {variant.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* 3D Model */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="relative"
            >
              <motion.div
                key={selectedVariant}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: EASE_CUBIC }}
                className="h-full min-h-[300px] max-h-[400px] bg-white rounded-2xl shadow-lg border border-[#B3E5FC] p-4 flex items-center justify-center"
              >
                <div className="w-full h-full max-w-[280px] max-h-[280px]">
                  <SlipSheetModel variantId={selectedVariant} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dimensions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full bg-white rounded-2xl shadow-xl border border-[#B3E5FC] overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-[#005F8C] mb-4">
                  Dimensions
                </h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table 
                    className="w-full text-sm min-w-[400px]" 
                    ref={dimensionsTableRef}
                    style={{ tableLayout: 'fixed' }}
                  >
                    <colgroup>
                      <col style={{ width: '60%' }} />
                      <col style={{ width: '40%' }} />
                    </colgroup>
                    <thead>
                      <tr className="bg-linear-to-r from-[#80D4F8] to-[#4DC4F5] text-white">
                        <th className="px-3 sm:px-4 py-3 text-left font-semibold">
                          Specification
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-left font-semibold">
                          Measurement
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {dimensionsTable.map((row, index) => {
                        const cellDelay = 0.15
                        const rowDelay = index * (cellDelay * 2 + 0.1)

                        return (
                          <motion.tr
                            key={row.label}
                            whileHover={{
                              backgroundColor: '#F0FBFF',
                              transition: { duration: 0.2 }
                            }}
                            className={`border-t border-[#E6F7FF] ${
                              index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                            } transition-colors duration-200`}
                          >
                            <CombinationLockCell
                              isInView={isDimensionsInView}
                              delay={rowDelay}
                              className="px-3 sm:px-4 py-3 font-medium text-[#334155] text-xs sm:text-sm"
                            >
                              {row.label}
                            </CombinationLockCell>
                            <CombinationLockCell
                              isInView={isDimensionsInView}
                              delay={rowDelay + cellDelay}
                              className="px-3 sm:px-4 py-3 text-[#334155] text-xs sm:text-sm"
                            >
                              <span className="">{row.value}</span>
                            </CombinationLockCell>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Thickness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="w-full bg-white rounded-2xl shadow-xl border border-[#B3E5FC] overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-[#005F8C] mb-4">
                  Thickness & Pulling Strength
                </h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table 
                    className="w-full text-sm min-w-[400px]" 
                    ref={thicknessTableRef}
                    style={{ tableLayout: 'fixed' }}
                  >
                    <colgroup>
                      <col style={{ width: '40%' }} />
                      <col style={{ width: '60%' }} />
                    </colgroup>
                    <thead>
                      <tr className="bg-linear-to-r from-[#4DC4F5] to-[#00A0E3] text-white">
                        <th className="px-3 sm:px-4 py-3 text-left font-semibold">
                          Thickness
                        </th>
                        <th className="px-3 sm:px-4 py-3 text-left font-semibold">
                          Pulling Strength
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {thicknessTable.map((row, index) => {
                        const cellDelay = 0.15
                        const rowDelay = index * (cellDelay * 2 + 0.1)

                        return (
                          <motion.tr
                            key={row.thickness}
                            whileHover={{
                              backgroundColor: '#F0FBFF',
                              transition: { duration: 0.2 }
                            }}
                            className={`border-t border-[#E6F7FF] ${
                              index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                            } transition-colors duration-200`}
                          >
                            <CombinationLockCell
                              isInView={isThicknessInView}
                              delay={rowDelay}
                              className="px-3 sm:px-4 py-3 font-medium text-[#334155] text-xs sm:text-sm"
                            >
                              <span className="">{row.thickness}</span>
                            </CombinationLockCell>
                            <CombinationLockCell
                              isInView={isThicknessInView}
                              delay={rowDelay + cellDelay}
                              className="px-3 sm:px-4 py-3 text-[#334155] text-xs sm:text-sm"
                            >
                              <span className="">{row.pulling}</span>
                            </CombinationLockCell>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}