'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function ProductVariants() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedVariant, setSelectedVariant] = useState('single-lip')

  const variants = [
    {
      id: 'single-lip',
      title: 'Single-Lip',
      description: 'Access from one side',
      icon: '📄',
      specs: { thickness: '0.8-1.2mm', size: 'Custom', capacity: '1000-2000kg' }
    },
    {
      id: 'double-lip-opposite',
      title: 'Double-Lip (Opposite)',
      description: 'Access from two opposite sides',
      icon: '📑',
      specs: { thickness: '1.0-1.5mm', size: 'Custom', capacity: '1500-2500kg' }
    },
    {
      id: 'double-lip-adjacent',
      title: 'Double-Lip (Adjacent)',
      description: 'Access from two adjacent sides',
      icon: '📋',
      specs: { thickness: '1.2-1.8mm', size: 'Custom', capacity: '2000-3000kg' }
    },
    {
      id: 'multi-lip',
      title: 'Multi-Lip',
      description: 'Access from all four sides',
      icon: '📊',
      specs: { thickness: '1.5-2.0mm', size: 'Custom', capacity: '2500-4000kg' }
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

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Product Variants & Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from multiple configurations and materials to match your specific handling requirements
          </p>
        </motion.div>

        {/* Material Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Material Comparison</h3>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-600">
                    <th className="px-8 py-6 text-left font-bold text-white text-lg">Specifications</th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">
                      <div className="flex items-center justify-center space-x-3">
                        <span>KK Kraft Paper</span>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">
                      <div className="flex items-center justify-center space-x-3">
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
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="px-8 py-4 font-semibold text-gray-800 text-lg">
                        {row.attribute}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.2 }}
                          className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium"
                        >
                          {row.kraft}
                        </motion.span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
                          className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
                        >
                          {row.plastic}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Lip Configurations with 2x2 Grid and Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lip Configurations</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: 2x2 Grid for Lip Options */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {variants.map((variant, index) => (
                  <motion.button
                    key={variant.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`p-8 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      selectedVariant === variant.id
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl'
                        : 'bg-white text-gray-900 hover:shadow-xl border border-gray-200'
                    }`}
                  >
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 opacity-10 ${
                      selectedVariant === variant.id ? 'bg-white' : 'bg-gradient-to-br from-blue-100 to-purple-100'
                    }`}>
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-6xl mb-4 group-hover:animate-bounce">{variant.icon}</div>
                      <h4 className="font-bold text-xl mb-3">{variant.title}</h4>
                      <p className={`text-sm mb-4 ${
                        selectedVariant === variant.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {variant.description}
                      </p>
                      <div className={`text-xs space-y-1 ${
                        selectedVariant === variant.id ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        <div><strong>Capacity:</strong> {variant.specs.capacity}</div>
                        <div><strong>Thickness:</strong> {variant.specs.thickness}</div>
                      </div>
                    </div>

                    {selectedVariant === variant.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(45deg, #3b82f6 25%, transparent 25%), linear-gradient(-45deg, #3b82f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3b82f6 75%), linear-gradient(-45deg, transparent 75%, #3b82f6 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}></div>
              </div>

              <div className="text-center relative z-10">
                <motion.div
                  key={selectedVariant}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="text-4xl mb-3">
                    {variants.find(v => v.id === selectedVariant)?.icon}
                  </div>
                  <h5 className="font-bold text-lg text-gray-800 mb-2">
                    {variants.find(v => v.id === selectedVariant)?.title}
                  </h5>
                  <p className="text-gray-600 text-sm">
                    {variants.find(v => v.id === selectedVariant)?.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}