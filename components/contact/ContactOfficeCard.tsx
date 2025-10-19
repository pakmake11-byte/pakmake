'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { cardVariants, infoItemVariants, EASE_CUBIC } from '@/lib/animations/variants'
import type { ComponentType, ReactNode, SVGProps } from 'react'

interface ContactInfo {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
  href: string | null
}

interface ContactOfficeCardProps {
  country: string
  city: string
  icon: ReactNode
  email: string
  phone: string
  address: string
  mapSrc: string
  index: number
  isInView: boolean
}

export function ContactOfficeCard({
  country,
  city,
  icon,
  email,
  phone,
  address,
  mapSrc,
  index,
  isInView
}: ContactOfficeCardProps) {
  const contactInfo: ContactInfo[] = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: MapPin, label: 'Address', value: address, href: null }
  ]

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#B3E5FC] overflow-hidden group h-full">
        <div className="lg:flex h-full">
          {/* Map Section */}
          <MapSection mapSrc={mapSrc} isInView={isInView} index={index} />

          {/* Content Section */}
          <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between relative">
            <GradientOverlay />
            
            <div className="relative z-10">
              <OfficeHeader country={country} city={city} icon={icon} />
              <ContactInfoList contactInfo={contactInfo} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Map Section Component
function MapSection({ 
  mapSrc, 
  isInView, 
  index 
}: { 
  mapSrc: string
  isInView: boolean
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: EASE_CUBIC }}
      className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A0E3]/20 to-[#007CB8]/20 mix-blend-overlay z-10" />
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
      />
    </motion.div>
  )
}

// Gradient Overlay Component
function GradientOverlay() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#E6F7FF]/0 via-[#E6F7FF]/30 to-[#B3E5FC]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  )
}

// Office Header Component
function OfficeHeader({ 
  country, 
  city, 
  icon 
}: { 
  country: string
  city: string
  icon: ReactNode 
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl drop-shadow-md"
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-[#003E5C] mb-0.5">
            {country}
          </h3>
          <div className="flex items-center gap-1.5 text-[#00A0E3]">
            <MapPin className="w-4 h-4" />
            <p className="font-medium text-sm">{city}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Info List Component
function ContactInfoList({ contactInfo }: { contactInfo: ContactInfo[] }) {
  return (
    <div className="space-y-3">
      {contactInfo.map((info, idx) => {
        const Icon = info.icon
        return (
          <motion.div
            key={idx}
            variants={infoItemVariants}
            className="flex items-start gap-3 group/item"
          >
            <div className="bg-gradient-to-br from-[#E6F7FF] to-[#B3E5FC] p-2 rounded-lg group-hover/item:from-[#B3E5FC] group-hover/item:to-[#80D4F8] transition-all duration-300 flex-shrink-0">
              <Icon className="w-4 h-4 text-[#00A0E3]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#334155] text-xs mb-0.5 uppercase tracking-wide">
                {info.label}
              </p>
              {info.href ? (
                <a 
                  href={info.href} 
                  className="text-[#334155] hover:text-[#00A0E3] transition-colors text-sm font-medium block truncate"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-[#334155] text-sm leading-snug line-clamp-2">
                  {info.value}
                </p>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}