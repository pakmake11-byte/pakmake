'use client'

import React, { useRef, useState, useEffect, memo } from 'react'
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

type CombinationLockCellProps = {
  children?: React.ReactNode
  isInView: boolean
  delay: number
  className?: string
}

function getTextFromNode(node: React.ReactNode): string {
  if (node === null || node === undefined) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(n => getTextFromNode(n)).join('')
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return getTextFromNode(el.props.children)
  }

  return String(node)
}

const CombinationLockCell = memo(function CombinationLockCell({
  children,
  isInView,
  delay,
  className,
}: CombinationLockCellProps) {
  const [displayValue, setDisplayValue] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const targetText = getTextFromNode(children ?? '')
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (!isInView) {
      setDisplayValue('')
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)

    timeoutRef.current = window.setTimeout(() => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*'
      const duration = 600
      const steps = 20
      const stepDuration = Math.max(10, Math.floor(duration / steps))
      let currentStep = 0

      intervalRef.current = window.setInterval(() => {
        if (currentStep < steps) {
          const progress = currentStep / steps
          const revealedLength = Math.floor(targetText.length * progress)
          let newValue = ''
          for (let i = 0; i < targetText.length; i++) {
            if (i < revealedLength) newValue += targetText[i]
            else newValue += chars[Math.floor(Math.random() * chars.length)]
          }
          setDisplayValue(newValue)
          currentStep++
        } else {
          setDisplayValue(targetText)
          setIsAnimating(false)
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

  let content: React.ReactNode
  if (React.isValidElement(children)) {
    content = React.cloneElement(children as React.ReactElement<{ children?: React.ReactNode }>, {
      children: displayValue || targetText,
    })
  } else {
    content = displayValue || targetText
  }

  return (
    <motion.td
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, delay }}
      className={`${className} align-middle`}
    >
      <div
        className={`flex items-center justify-center leading-5 text-center transition-all duration-300 ${isAnimating ? 'min-h-14 overflow-hidden' : 'min-h-0 overflow-visible'
          }`}
      >
        {/* Allow wrapping AFTER animation */}
        <span className="inline-block  whitespace-normal break-words">
          {content}
        </span>
      </div>
    </motion.td>
  )
})


export function ComparisonSection() {
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
              <table
                className="w-full min-w-[500px] table-fixed"
                style={{ tableLayout: 'fixed' }}
              >
                <colgroup>
                  <col style={{ width: '33.33%' }} />
                  <col style={{ width: '33.33%' }} />
                  <col style={{ width: '33.33%' }} />
                </colgroup>
                <thead>
                  <tr className="border-b-2 border-[#E6F7FF]">
                    <th className="text-center py-2 px-3 sm:px-4 font-bold text-sm sm:text-base">
                      Metric
                    </th>

                    <th className="text-center py-2 px-3 sm:px-4 font-bold text-sm sm:text-base">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#DC2626] to-[#991B1B] font-extrabold tracking-wide">
                        Wooden Pallet
                      </span>
                    </th>

                    <th className="text-center py-2 px-3 sm:px-4 font-bold text-sm sm:text-base">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#509ec0] to-[#227294] font-extrabold tracking-wide">
                        Slip Sheet
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => {
                    const cellDelay = 0.15
                    const rowDelay = 1 + index * (cellDelay * 3 + 0.1)

                    return (
                      <motion.tr
                        key={row.metric}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: '#F0FBFF',
                          transition: { duration: 0.2 },
                        }}
                        className={`border-b border-[#E6F7FF] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]'
                          } transition-colors duration-200`}
                      >
                        <CombinationLockCell
                          isInView={isTableInView}
                          delay={rowDelay}
                          className="py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-[#334155]"
                        >
                          {row.metric}
                        </CombinationLockCell>

                        <CombinationLockCell
                          isInView={isTableInView}
                          delay={rowDelay + cellDelay}
                          className="py-2 px-3 sm:px-4 text-center"
                        >
                          <span className="inline-block font-semibold text-xs sm:text-sm text-[#DC2626] bg-red-50 px-2 py-1 rounded  whitespace-normal break-words">
                            {row.pallet}
                          </span>

                        </CombinationLockCell>

                        <CombinationLockCell
                          isInView={isTableInView}
                          delay={rowDelay + cellDelay * 2}
                          className="py-2 px-3 sm:px-4 text-center"
                        >
                          <motion.span
                            className="inline-block font-bold text-xs sm:text-sm text-[#00A0E3] bg-[#E6F7FF] px-2 py-1 rounded  whitespace-normal break-words"
                            whileHover={{ scale: 1.1 }}
                          >
                            {row.slipSheet}
                          </motion.span>
                        </CombinationLockCell>
                      </motion.tr>
                    )
                  })}
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
            <p className="text-center text-base sm:text-4xl text-[#003E5C] font-semibold mb-8">
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
            <p className="text-[#2d3035] text-center mt-8 text-sm sm:text-base leading-relaxed">
              Slip Sheets eliminate the need for bulky wooden pallets — saving space, weight, and cost in every shipment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
