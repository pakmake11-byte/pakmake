'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Truck } from 'lucide-react'

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const comparisonData = [
    { metric: 'Savings', slipSheet: '80%', pallet: 'Standard' },
    { metric: 'Storage space (1000 units)', slipSheet: '1m³', pallet: '70m³' },
    { metric: 'Weight', slipSheet: '<1kg', pallet: '15-25kg' },
    { metric: 'Loading speed', slipSheet: '60% faster', pallet: 'Standard' },
    { metric: 'Material handling containers', slipSheet: '12-15% more products', pallet: 'Standard capacity' },
    { metric: 'Maintenance required', slipSheet: 'None', pallet: 'Regular upkeep' },
    { metric: 'Environmental impact', slipSheet: '100% recyclable', pallet: 'Limited recyclability' },
    { metric: 'Phytosanitary restrictions', slipSheet: 'Exempt', pallet: 'Subject to restrictions' }
  ]

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          title="Slip Sheets vs"
          highlightedText="Wooden Pallets"
          subtitle="See the dramatic difference our slip sheets make compared to traditional pallets"
          isInView={isInView}
          icon={Truck}
        />

        {/* Table + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-2 overflow-hidden h-full"
          >
            <table className="w-full h-full table-fixed">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Metric</th>
                  <th className="text-center py-3 px-2 font-semibold text-primary-600">Slip Sheet</th>
                  <th className="text-center py-3 px-2 font-semibold text-red-600">Wooden Pallet</th>
                </tr>
              </thead>
              <tbody className="h-full">
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.metric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="border-b border-gray-50 hover:bg-gray-25"
                  >
                    <td className="py-3 px-2 text-sm font-medium text-gray-700">{row.metric}</td>
                    <td className="py-3 px-2 text-center text-sm font-semibold text-primary-600">{row.slipSheet}</td>
                    <td className="py-3 px-2 text-center text-sm font-semibold text-red-600">{row.pallet}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Visual Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-full"
          >
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              src="/home/slip-vs-woorden.png"
              alt="Slip Sheets vs Wooden Pallets Storage Space Comparison"
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
