'use client'

import { AnimatePresence, motion, useInView, cubicBezier } from 'framer-motion'
import { useRef, useState } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'

type SlipSheetVariant = 'single-lip' | 'double-lip-opposite' | 'double-lip-adjacent' | 'multi-lip'

export function ProductVariants() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

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
    }
  ]

  const comparisonData = [
    { attribute: 'Primary Use', kraft: 'Export Shipments Only', plastic: 'Export & Internal Warehouse' },
    { attribute: 'Cost Range', kraft: '₹250-400 per sheet', plastic: '₹300-500 per sheet' },
    { attribute: 'Load Capacity', kraft: '800-2000 Kg', plastic: '800-3500 Kg' },
    { attribute: 'Reusability', kraft: '4-5 times', plastic: '50-100 times' },
    { attribute: 'Moisture Resistance', kraft: 'Limited', plastic: 'Excellent' },
    { attribute: 'Storage Duration', kraft: '3 Months', plastic: 'Unlimited' },
    { attribute: 'Cost Saving', kraft: '60-65%', plastic: '70-75%' },
    { attribute: 'Recyclable', kraft: '100% Recyclable', plastic: '100% Recyclable' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
      }
    }
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            Product Variants & Specifications
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from multiple configurations and materials to match your specific handling requirements
          </p>
        </motion.div>

        {/* Material Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Material Comparison
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                    <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-left font-bold text-white text-sm sm:text-base lg:text-lg">
                      Specifications
                    </th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-center font-bold text-white text-sm sm:text-base lg:text-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <span>Kraft Paper</span>
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-center font-bold text-white text-sm sm:text-base lg:text-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <span>PP Plastic</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.attribute}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.05) }}
                      className={`border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                    >
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
                        {row.attribute}
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg font-medium text-xs sm:text-sm border border-amber-200"
                        >
                          {row.kraft}
                        </motion.span>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg font-medium text-xs sm:text-sm border border-blue-200"
                        >
                          {row.plastic}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Lip Configurations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Lip Configurations
          </h3>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Variant Selection Grid */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                {variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVariant(variant.id as SlipSheetVariant)}
                    className={`relative p-6 sm:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${selectedVariant === variant.id
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg'
                        : 'bg-white text-gray-900 hover:shadow-lg border-2 border-gray-200 hover:border-primary-300'
                      }`}
                    aria-pressed={selectedVariant === variant.id}
                    aria-label={`Select ${variant.title} configuration`}
                  >
                    {/* Background Gradient Effect */}
                    {selectedVariant !== variant.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    )}

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
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                            >
                              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <p className={`text-sm mb-4 leading-relaxed ${selectedVariant === variant.id ? 'text-primary-100' : 'text-gray-600 group-hover:text-gray-900'
                        }`}>
                        {variant.description}
                      </p>
                    </div>

                    {/* Hover border effect */}
                    {selectedVariant !== variant.id && (
                      <motion.div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* 3D Model Viewer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              <div className="sticky top-24">
                <motion.div
                  key={selectedVariant}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-80"
                >
                  <SlipSheetModel variantId={selectedVariant} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}