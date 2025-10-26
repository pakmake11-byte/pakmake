'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Globe2 } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createContainerVariants, EASE_CUBIC } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactOfficeCard } from './ContactOfficeCard'

const OFFICES = [
  {
    country: 'India',
    city: 'Jaipur, Rajasthan',
    icon: '🇮🇳',
    email: 'sandeepjaju@yahoo.com',
    phone: '+91 98291-87167',
    address: 'Plt. 52, Soni Ka Bagh, Behind Alka Cinema, Sikar Road, Jaipur-302039 (Rajasthan)',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3485.3734642339014!2d75.78219227544274!3d27.004774076592344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDAwJzE3LjIiTiA3NcKwNDcnMDUuMiJF!5e1!3m2!1sen!2sin!4v1761486381033!5m2!1sen!2sin'
  },
  {
    country: 'UAE',
    city: 'Ajman, UAE',
    icon: '🇦🇪',
    email: 'sandeepjaju@yahoo.com',
    phone: '+971 558570247',
    address: '308, Garden City, Jurf, Ajman, UAE',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.0102048171023!2d55.4820!3d25.4112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f72e2a4e7ef9%3A0x37b55c123d6f7f2b!2sGarden%20City%20Residences!5e0!3m2!1sen!2sae!4v1697044567890!5m2!1sen!2sae'
  },
]

export function ContactInfo() {
  const { ref, isInView } = useInViewAnimation()
  const scrollDirection = useScrollDirection()
  const containerVariants = createContainerVariants(scrollDirection)

  return (
    <AnimatePresence>
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="exit"
        className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Dynamic background with multiple layers */}
        <BackgroundElements isInView={isInView} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: EASE_CUBIC }}
          >
            <SectionHeader
              icon={Globe2}
              title="Our Global"
              highlightedText="Offices"
              subtitle="Connect with our local teams for personalized support in your region"
              isInView={isInView}
              iconGradient="from-primary-100 to-primary-300"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8 mt-12"
          >
            {OFFICES.map((office, index) => (
              <ContactOfficeCard
                key={office.country}
                {...office}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

function BackgroundElements({ isInView }: { isInView: boolean }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00A0E3 1px, transparent 1px),
            linear-gradient(to bottom, #00A0E3 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={isInView ? {
          backgroundPosition: ['0px 0px', '40px 40px'],
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + (i % 4) * 20}%`,
          }}
          animate={isInView ? {
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          } : {}}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 bg-primary-400 rounded-full" />
        </motion.div>
      ))}
    </>
  )
}
