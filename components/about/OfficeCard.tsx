'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

interface OfficeCardProps {
  location: string
  address: string
  details: string
  icon: string
}

export function OfficeCard({ location, address, details, icon }: OfficeCardProps) {
  return (
    <AnimatedCard>
      <div className="p-8 sm:p-10 text-center">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.6 } }}
  className="inline-block text-5xl drop-shadow-md mb-6"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{location}</h3>
        <div className="flex items-center justify-center gap-2 text-[#00A0E3] font-semibold mb-3 text-base">
          <MapPin className="w-5 h-5" />
          {address}
        </div>
        <p className="text-[#334155] text-base">{details}</p>
      </div>
    </AnimatedCard>
  )
}