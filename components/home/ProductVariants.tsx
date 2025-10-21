'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Package2 } from 'lucide-react'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'

type SlipSheetVariant =
  | 'single-lip'
  | 'double-lip-opposite'
  | 'double-lip-adjacent'
  | 'multi-lip'

const EASE_CUBIC = [0.65, 0, 0.35, 1] as const

export function ProductVariants() {
  const { ref, isInView } = useInViewAnimation({ once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()
  const directionNum: number =
    typeof scrollDirection === 'number'
      ? scrollDirection
      : scrollDirection === 'down'
        ? 1
        : -1

  const [selectedVariant, setSelectedVariant] = useState<SlipSheetVariant>('multi-lip')

  const variants = [
    {
      id: 'single-lip',
      title: 'Single-Lip',
      description: 'Access from one side',
    },
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

  const comparisonData = [
    {
      attribute: 'Primary Use',
      kraft: 'Export Shipments Only',
      plastic: 'Export & Internal Warehouse',
    },
    {
      attribute: 'Cost Range',
      kraft: '₹250-400 per sheet',
      plastic: '₹300-500 per sheet',
    },
    { attribute: 'Load Capacity', kraft: '800-2000 Kg', plastic: '800-3500 Kg' },
    { attribute: 'Reusability', kraft: '4-5 times', plastic: '50-100 times' },
    { attribute: 'Moisture Resistance', kraft: 'Limited', plastic: 'Excellent' },
    { attribute: 'Storage Duration', kraft: '3 Months', plastic: 'Unlimited' },
    { attribute: 'Cost Saving', kraft: '60-65%', plastic: '70-75%' },
    {
      attribute: 'Recyclable',
      kraft: '100% Recyclable',
      plastic: '100% Recyclable',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        when: 'beforeChildren',
      },
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

  return (
    <section
      ref={ref}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F7FA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#B3E5FC]">
            <div className="overflow-x-auto no-scrollbar min-w-0">
              <motion.table className="w-full" variants={containerVariants}>
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-[#003E5C] text-sm sm:text-base">
                      Specifications
                    </th>
                    <th className="px-6 py-4 text-center font-bold text-sm sm:text-base text-white">
                      <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#80D4F8] to-[#4DC4F5]">
                        Kraft Paper Slip Sheet
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-bold text-sm sm:text-base text-white">
                      <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4DC4F5] to-[#00A0E3]">
                        PP Plastic Slip Sheet
                      </div>
                    </th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants}>
                  {comparisonData.map((row, i) => (
                    <motion.tr
                      key={row.attribute}
                      variants={getItemVariants(directionNum)}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: i * 0.08, duration: 0.7, ease: EASE_CUBIC }}
                      className={`border-t border-[#E6F7FF] ${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                      } hover:bg-[#F0FBFF] transition-colors duration-200`}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <td className="px-6 py-4 font-semibold text-[#334155] text-sm">
                        {row.attribute}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-5 py-1.5 bg-transparent hover:bg-amber-50 text-amber-800 rounded-lg font-medium text-xs sm:text-sm border border-amber-200">
                          {row.kraft}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-5 py-1.5 bg-transparent hover:bg-blue-100 text-blue-800 rounded-lg font-medium text-xs sm:text-sm border border-blue-200">
                          {row.plastic}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </motion.table>
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
            {/* Variant Buttons */}
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
                    onClick={() => setSelectedVariant(variant.id as SlipSheetVariant)}
                    className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 group overflow-hidden ${
                      selectedVariant === variant.id
                        ? 'bg-gradient-to-br from-[#00A0E3] to-[#007CB8] text-white shadow-xl'
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
                          selectedVariant === variant.id ? 'text-[#E6F7FF]' : 'text-[#334155]'
                        }`}
                      >
                        {variant.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* 3D Model - Static, smaller size */}
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

          {/* Tables Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dimensions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full bg-white rounded-2xl shadow-md border border-[#B3E5FC] p-4 sm:p-6"
            >
              <h4 className="text-lg font-semibold text-[#005F8C] mb-3">
                Dimensions
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#80D4F8] to-[#4DC4F5] text-white">
                      <th className="px-3 py-2 text-left font-semibold">Specification</th>
                      <th className="px-3 py-2 text-left font-semibold">Measurement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dimensionsTable.map((row, i) => (
                      <motion.tr
                        key={row.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                        className={`border-t border-[#E6F7FF] ${
                          i % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                        } hover:bg-[#F8FDFF] transition-colors duration-200`}
                      >
                        <td className="px-3 py-3 font-medium text-[#334155]">{row.label}</td>
                        <td className="px-3 py-3 text-[#334155]">{row.value}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Thickness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="w-full bg-white rounded-2xl shadow-md border border-[#B3E5FC] p-4 sm:p-6"
            >
              <h4 className="text-lg font-semibold text-[#005F8C] mb-3">
                Thickness & Pulling Strength
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#4DC4F5] to-[#00A0E3] text-white">
                      <th className="px-3 py-2 text-left font-semibold">Thickness</th>
                      <th className="px-3 py-2 text-left font-semibold">Pulling Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thicknessTable.map((row, i) => (
                      <motion.tr
                        key={row.thickness}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                        className={`border-t border-[#E6F7FF] ${
                          i % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                        } hover:bg-[#F8FDFF] transition-colors duration-200`}
                      >
                        <td className="px-3 py-3 font-medium text-[#334155]">{row.thickness}</td>
                        <td className="px-3 py-3 text-[#334155]">{row.pulling}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}