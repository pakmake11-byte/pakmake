'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Handshake, Star } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { 
  createContainerVariants, 
  itemVariants, 
  fadeInUpVariants, 
  EASE_CUBIC 
} from '@/lib/animations/variants'
import { GradientText } from '@/components/ui/GradientText'
import { ValueCard } from './ValueCard'

const VALUES = [
  {
    title: 'Innovation',
    description: 'Continuously developing cutting-edge solutions that challenge traditional logistics methods.',
    icon: Lightbulb,
  },
  {
    title: 'Sustainability',
    description: 'Committed to 100% recyclable materials and reducing environmental impact across supply chains.',
    icon: Leaf,
  },
  {
    title: 'Partnership',
    description: 'Working closely with clients to optimize their unique material handling processes.',
    icon: Handshake,
  },
  {
    title: 'Excellence',
    description: 'Delivering superior quality products with custom specifications and technical expertise.',
    icon: Star,
  }
]

const CONTENT_SECTIONS = [
  {
    title: 'Our Values',
    text: 'Our commitment extends beyond just supplying products – we partner with businesses to transform their logistics operations. By replacing conventional pallets with our lightweight, cost-effective slip sheets, we help companies achieve significant savings while reducing their environmental footprint.'
  },
  {
    title: 'Why Choose PakMake',
    text: 'With expertise in custom sizing, technical specifications, and industry-specific requirements, we ensure that every slip sheet solution is tailored to maximize efficiency and minimize costs. Our sustainable approach, using 100% recyclable kraft paper from certified forests, aligns with modern corporate responsibility goals.'
  }
]

export function CompanyMission() {
  const { ref, isInView } = useInViewAnimation()
  const scrollDirection = useScrollDirection()
  const containerVariants = createContainerVariants(scrollDirection)

  return (
    <section ref={ref} className="my-20 sm:my-24 lg:my-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ---------------- LEFT CONTENT ---------------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-between h-full space-y-8"
          >
            {/* Heading */}
            <motion.h2
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, ease: EASE_CUBIC }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              Our <GradientText isInView={isInView}>Mission</GradientText>
            </motion.h2>

            {/* Intro Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base text-[#334155] text-justify"
            >
              PakMake Packaging Inc® specializes in providing innovative, sustainable 
              alternatives to traditional wooden pallets. We work closely with clients 
              to redesign, add value, and optimize their material handling processes 
              through our durable kraft paper slip sheets.
            </motion.p>

            {/* Values & Why Choose Sections */}
            {CONTENT_SECTIONS.map((section, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                <p className="text-base text-[#334155] text-justify">{section.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ---------------- RIGHT CONTENT ---------------- */}
          <motion.div 
            className="space-y-6 h-full flex flex-col justify-between"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {VALUES.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ValueCard
                  {...value}
                  index={index}
                  isInView={isInView}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}