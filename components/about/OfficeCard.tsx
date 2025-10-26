'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { cardHoverVariants } from '@/lib/animations/variants'

interface OfficeCardProps {
  location: string
  address: string
  details: string
  icon: string
  index: number
  scrollDirection: number
}

export const OfficeCard = React.memo(function OfficeCard({ 
  location, 
  address, 
  details, 
  icon, 
  index, 
  scrollDirection 
}: OfficeCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full"
    >
      <div className="p-8 sm:p-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.1 + index * 0.05, 
            duration: 0.3,
          }}
          whileHover={{ 
            rotate: 360, 
            scale: 1.1,
            transition: { duration: 0.5 } 
          }}
          className="inline-block text-5xl drop-shadow-lg mb-6"
        >
          {icon}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: scrollDirection > 0 ? 15 : -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{location}</h3>
          <div className="flex items-center justify-center gap-2 text-[#00A0E3] font-semibold mb-3 text-base">
            <MapPin className="w-5 h-5" />
            {address}
          </div>
          <p className="text-[#334155] text-base leading-relaxed">{details}</p>
        </motion.div>
      </div>
    </motion.div>
  )
})