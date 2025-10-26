'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react'
import { cardVariants, infoItemVariants, EASE_CUBIC } from '@/lib/animations/variants'
import type { ComponentType, ReactNode, SVGProps } from 'react'

interface ContactInfo {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
  href: string | null
  copyable?: boolean
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
  const [isHovered, setIsHovered] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const contactInfo: ContactInfo[] = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}`, copyable: true },
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone}`, copyable: true },
    { icon: MapPin, label: 'Address', value: address, href: null, copyable: false }
  ]

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE_CUBIC } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border border-primary-200 overflow-hidden group h-full">
        <div className="lg:flex h-full">
          {/* Map Section */}
          <MapSection mapSrc={mapSrc} isInView={isInView} index={index} isHovered={isHovered} />

          {/* Content Section */}
          <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between relative">
            <div className="relative z-10">
              <OfficeHeader country={country} city={city} icon={icon} isHovered={isHovered} />
              <ContactInfoList
                contactInfo={contactInfo}
                isHovered={isHovered}
                onCopy={handleCopy}
                copiedField={copiedField}
              />
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
  index,
  isHovered
}: {
  mapSrc: string
  isInView: boolean
  index: number
  isHovered: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: EASE_CUBIC }}
      className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden"
    >
      <motion.iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        animate={{
          filter: isHovered ? 'grayscale(0%) brightness(1.05)' : 'grayscale(30%)',
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

// Office Header Component
function OfficeHeader({
  country,
  city,
  icon,
  isHovered
}: {
  country: string
  city: string
  icon: ReactNode
  isHovered: boolean
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            ease: EASE_CUBIC,
          }}
          className="text-4xl"
        >
          {icon}
        </motion.div>

        <div>
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-0.5"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {country}
          </motion.h3>
          <motion.div
            className="flex items-center gap-1.5 text-gray-500"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <MapPin className="w-4 h-4" />
            <p className="font-medium text-sm">{city}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Contact Info List Component
function ContactInfoList({
  contactInfo,
  isHovered,
  onCopy,
  copiedField,
}: {
  contactInfo: ContactInfo[]
  isHovered: boolean
  onCopy: (text: string, field: string) => void
  copiedField: string | null
}) {
  return (
    <div className="space-y-3">
      {contactInfo.map((info, idx) => {
        const Icon = info.icon
        const [itemHovered, setItemHovered] = useState(false)
        const isCopied = copiedField === info.label

        return (
          <motion.div
            key={idx}
            variants={infoItemVariants}
            className="group/item"
            onHoverStart={() => setItemHovered(true)}
            onHoverEnd={() => setItemHovered(false)}
            animate={{
              x: isHovered ? 6 : 0,
            }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <div className="flex items-start gap-3 relative">
              <motion.div
                className="p-2 rounded-md border border-gray-200 flex-shrink-0"
                animate={{
                  scale: itemHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </motion.div>

              <div className="flex-1 min-w-0 relative">
                <p className="font-semibold text-gray-600 text-xs mb-0.5 uppercase tracking-wide">
                  {info.label}
                </p>
                <div className="flex items-center gap-2">
                  {info.href ? (
                    <motion.a
                      href={info.href}
                      className="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium flex items-center gap-1"
                      whileHover={{ x: 2 }}
                    >
                      <span className="truncate">{info.value}</span>
                    </motion.a>
                  ) : (
                    <p className="text-gray-800 text-sm leading-snug line-clamp-2">
                      {info.value}
                    </p>
                  )}

                  {info.copyable && (
                    <motion.button
                      onClick={() => onCopy(info.value, info.label)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                      title="Copy to clipboard"
                    >
                      <AnimatePresence mode="wait">
                        {isCopied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                          >
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-700" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
