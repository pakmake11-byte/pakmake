'use client'

import React, { useRef, JSX } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Truck } from 'lucide-react'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

const comparisonData = [
  { metric: 'Savings', slipSheet: '80%', pallet: 'Standard' },
  { metric: 'Storage space (1000 units)', slipSheet: '1m³', pallet: '70m³' },
  { metric: 'Weight', slipSheet: '<1kg', pallet: '15-25kg' },
  { metric: 'Loading speed', slipSheet: '60% faster', pallet: 'Standard' },
  { metric: 'Material handling containers', slipSheet: '12-15% more products', pallet: 'Standard capacity' },
  { metric: 'Maintenance required', slipSheet: 'None', pallet: 'Regular upkeep' },
  { metric: 'Environmental impact', slipSheet: '100% recyclable', pallet: 'Limited recyclability' },
  { metric: 'Phytosanitary restrictions', slipSheet: 'Exempt', pallet: 'Subject to restrictions' },
]

const EASE_CUBIC = [0.65, 0, 0.35, 1] as const

export function ComparisonSection(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const scrollDirection = useScrollDirection()

  const tableRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLDivElement | null>(null)
  const isTableInView = useInView(tableRef, { once: false, margin: '-50px' })
  const isVideoInView = useInView(videoRef, { once: false, margin: '-50px' })

  const getDirection = () => (scrollDirection === 1 ? 1 : -1)

  return (
    <section
      ref={ref}
      className="py-20 sm:py-24 lg:py-32 bg-paper-texture overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Wooden Pallets vs"
          highlightedText="Slip Sheets"
          subtitle="See the dramatic difference our slip sheets make compared to traditional pallets"
          isInView={isInView}
          icon={Truck}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Table Section */}
          <motion.div
            ref={tableRef}
            initial={{ opacity: 0, x: -50, y: getDirection() * 30 }}
            animate={isTableInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CUBIC }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-[#B3E5FC] flex flex-col justify-center"
          >
            <div className="overflow-x-auto sm:overflow-x-hidden -mx-4 sm:mx-0">
              <table className="w-full table-fixed overflow-x-hidden min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-[#E6F7FF]">
                    <th className="text-left py-2 px-3 sm:px-4 font-bold text-[#003E5C] text-sm sm:text-base">
                      Metric
                    </th>

                    {/* Wooden Pallet first */}
                    <th className="text-center py-2 px-3 sm:px-4 font-bold text-sm sm:text-base">
                      <span className="inline-block bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white px-3 py-1.5 rounded-lg">
                        Wooden Pallet
                      </span>
                    </th>

                    {/* Slip Sheet second */}
                    <th className="text-center py-2 px-3 sm:px-4 font-bold text-sm sm:text-base">
                      <span className="inline-block bg-gradient-to-r from-[#80D4F8] to-[#4DC4F5] text-white px-3 py-1.5 rounded-lg">
                        Slip Sheet
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.metric}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isTableInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 1 + index * 0.3,
                        ease: EASE_CUBIC,
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: '#F0FBFF',
                        transition: { duration: 0.2 },
                      }}
                      className={`border-b border-[#E6F7FF] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                        } transition-colors duration-200`}
                    >
                      <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-[#334155]">
                        {row.metric}
                      </td>

                      {/* Wooden Pallet first */}
                      <td className="py-2 px-3 sm:px-4 text-center">
                        <span className="inline-block font-semibold text-xs sm:text-sm text-[#DC2626] bg-red-50 px-2 py-1 rounded">
                          {row.pallet}
                        </span>
                      </td>

                      {/* Slip Sheet second */}
                      <td className="py-2 px-3 sm:px-4 text-center">
                        <motion.span
                          className="inline-block font-bold text-xs sm:text-sm text-[#00A0E3] bg-[#E6F7FF] px-2 py-1 rounded"
                          whileHover={{ scale: 1.1 }}
                        >
                          {row.slipSheet}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, x: 50, y: getDirection() * 30 }}
            animate={isVideoInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_CUBIC }}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center border border-[#B3E5FC]"
          >
            <p className="text-center text-sm sm:text-base text-[#003E5C] font-semibold mb-3">
              Watch the difference in action
            </p>

            <motion.video
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVideoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_CUBIC }}
              src="/home/comp.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="rounded-lg shadow-md w-full h-auto max-h-[400px] object-contain"
            />
            <p className="text-[#2d3035] text-center mt-4 text-sm sm:text-base leading-relaxed">
              Slip Sheets eliminate the need for bulky wooden pallets — saving space, weight, and cost in every shipment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
