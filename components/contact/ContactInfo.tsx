'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Globe2 } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createContainerVariants } from '@/lib/animations/variants'
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
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.178212556248!2d75.7718!3d26.9482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6f3cb0d52d7%3A0xa5c5e8e7d5432f0e!2sAlka%20Cinema!5e0!3m2!1sen!2sin!4v1697041234567!5m2!1sen!2sin' 
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
        className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Globe2}
            title="Our Global"
            highlightedText="Offices"
            subtitle="Connect with our local teams for personalized support in your region"
            isInView={isInView}
            iconGradient="from-[#E6F7FF] to-[#B3E5FC]"
          />

          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8"
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