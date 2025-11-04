'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { SlipSheetModel } from '@/components/three/SlipSheetModel'
import { BackgroundElements } from '../ui/BackgroundElements'
import { Boxes } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FeatureItem = ({
  label,
  description,
  index,
}: {
  label: string
  description: string
  index: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px', amount: 0.25 })

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: 20, y: -20, scale: 0.98 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 140,
          damping: 18,
          mass: 0.6,
          delay: index * 0.08,
        },
      },
    }),
    [index]
  )

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full"
    >
      <div
        className="group relative bg-white/30 dark:bg-black/30 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-400 border border-white/30 backdrop-blur-md
                   hover:-translate-y-2 transform will-change-transform overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.60))',
          borderColor: 'rgba(179,229,252,0.28)',
        }}
      >
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#003E5C] mb-2 leading-tight">
          {label}
        </h3>
        <p className="text-sm md:text-base text-[#004F70]/85 leading-6 line-clamp-2">
          {description}
        </p>

        {/* Subtle hover glow */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-[-12px] h-6 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(closest-side, rgba(179,229,252,0.18), rgba(179,229,252,0))',
            transform: 'translateY(6px)',
          }}
        />
      </div>
    </motion.div>
  )
}

export const ProductIntro = function ProductIntro() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: false, margin: '-100px', amount: 0.2 })

  const features = useMemo(
    () => [
      {
        label: 'Durable & Puncture Resistant',
        description: 'Engineered to withstand rough handling and repeated use without tearing.',
      },
      {
        label: '100% Virgin Kraft Board',
        description: 'Made from high-quality virgin fibers for superior strength and reliability.',
      },
      {
        label: 'No Maintenance Required',
        description: 'Completely maintenance-free—no repairs, no treatments, no hassle.',
      },
      {
        label: 'High Tensile Strength',
        description: 'Built to handle heavy loads without deformation or failure.',
      },
      {
        label: 'Custom Sizes Available',
        description: 'Tailor-made to suit your specific packaging and logistics needs.',
      },
      {
        label: '12–15% More Products per Load',
        description: 'Optimize space and efficiency in every shipment with thinner profiles.',
      },
      {
        label: '60–75% Cost Reduction',
        description: 'Save drastically on material, transport, and storage costs.',
      },
      {
        label: '100% Recyclable Material',
        description: 'Sustainably sourced and fully recyclable, supporting circular logistics.',
      },
      {
        label: '60% Faster Loading Time',
        description: 'Simplified handling processes mean faster turnaround at every step.',
      },
      {
        label: '1/20th Weight of Wood Pallets',
        description: 'Lightweight yet strong—reducing freight costs and improving safety.',
      },
    ],
    []
  )

  const headerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      },
    }),
    []
  )

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundElements isInView={isHeaderInView} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden lg:overflow-x-visible">
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
        >
          <SectionHeader
            icon={Boxes}
            title="Why Choose"
            highlightedText="Slip Sheets?"
            subtitle="Experience a paradigm shift in logistics. Our slip sheets outperform traditional pallets in every key metric."
            isInView={isHeaderInView}
            iconGradient="from-[#E0F7FA] to-[#B3E5FC]"
          />
        </motion.div>

        {/* Mobile: Model appears between header and features */}
        <div className="lg:hidden mt-12 mb-16">
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl shadow-2xl mx-auto max-w-lg" style={{ isolation: 'isolate' }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DFF7FA] via-[#B3E5FC]/60 to-[#E0F7FA]/90">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.9)_0%,rgba(179,229,252,0.3)_60%,transparent_100%)]" />
              </div>
            </div>
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <SlipSheetModel />
            </div>
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-20 gap-x-16 mt-12 lg:mt-20 items-start">
          {/* Sticky model on desktop only */}
          <div className="hidden lg:block sticky top-28 h-[560px]">
            <div className="relative w-full h-full rounded-3xl shadow-2xl" style={{ isolation: 'isolate' }}>
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#DFF7FA] via-[#B3E5FC]/60 to-[#E0F7FA]/90">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.9)_0%,rgba(179,229,252,0.3)_60%,transparent_100%)]" />
                </div>
              </div>
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                <SlipSheetModel />
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="flex flex-col space-y-8 sm:space-y-10 lg:space-y-14">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.label}
                label={feature.label}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}