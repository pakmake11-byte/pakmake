'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Leaf, Handshake, Star } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import {
  createContainerVariants,
  createItemVariants,
  createSlideVariants,
  EASE_OUT
} from '@/lib/animations/variants'
import { GradientText } from '@/components/ui/GradientText'
import { ValueCard } from './ValueCard'

import { BackgroundElements } from '../ui/BackgroundElements'

const VALUES = [
  { title: 'Innovation', description: 'Continuously developing cutting-edge solutions that challenge traditional logistics methods.', icon: Lightbulb },
  { title: 'Sustainability', description: 'Committed to 100% recyclable materials and reducing environmental impact across supply chains.', icon: Leaf },
  { title: 'Partnership', description: 'Working closely with clients to optimize their unique material handling processes.', icon: Handshake },
  { title: 'Excellence', description: 'Delivering superior quality products with custom specifications and technical expertise.', icon: Star },
]

const CONTENT_SECTIONS = [
  { title: 'Our Values', text: 'Our commitment extends beyond just supplying products – we partner with businesses to transform their logistics operations. By replacing conventional pallets with our lightweight, cost-effective slip sheets, we help companies achieve significant savings while reducing their environmental footprint.' },
  { title: 'Why Choose PakMake', text: 'With expertise in custom sizing, technical specifications, and industry-specific requirements, we ensure that every slip sheet solution is tailored to maximize efficiency and minimize costs. Our sustainable approach, using 100% recyclable kraft paper from certified forests, aligns with modern corporate responsibility goals.' },
]

export function CompanyMission() {
  const { ref, isInView } = useInViewAnimation({ amount: 0.25 })
  const scrollDirection = useScrollDirection()
  const containerVariants = createContainerVariants(scrollDirection)
  const itemVariants = createItemVariants(scrollDirection)
  const leftSlideVariants = createSlideVariants('left')
  const rightSlideVariants = createSlideVariants('right')

  return (
    <AnimatePresence>
      <motion.section
        ref={ref}
        className="relative py-20 sm:y-24 lg:py-32 overflow-hidden"
      >
        {/* Background Layer */}
        <BackgroundElements isInView={isInView} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

            {/* LEFT CONTENT */}
            <motion.div
              variants={leftSlideVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
              >
                Our <GradientText isInView={isInView}>Mission</GradientText>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.05 }}
                className="text-base text-[#334155] text-justify leading-relaxed"
              >
                PakMake Packaging Inc® specializes in providing innovative, sustainable
                alternatives to traditional wooden pallets. We work closely with clients
                to redesign, add value, and optimize their material handling processes
                through our durable kraft paper slip sheets.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                {CONTENT_SECTIONS.map((section, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-base text-[#334155] text-justify leading-relaxed">{section.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              variants={rightSlideVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                {VALUES.map((value, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <ValueCard
                      {...value}
                      index={index}
                      isInView={isInView}
                      scrollDirection={scrollDirection}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
