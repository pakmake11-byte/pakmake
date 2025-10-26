'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { scaleInVariants, cardHoverVariants } from '@/lib/animations/variants'

interface ValueCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
  isInView: boolean
  scrollDirection?: number
}

export function ValueCard({ 
  title, 
  description, 
  icon: Icon, 
  index, 
  isInView,
  scrollDirection = 1
}: ValueCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="p-6 flex items-start gap-4">
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ 
            delay: 0.1 + index * 0.05
          }}
          whileHover={{ 
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#80D4F8] to-[#00A0E3] rounded-xl flex items-center justify-center shadow-lg"
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </motion.div>
        
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: scrollDirection > 0 ? 15 : -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: scrollDirection > 0 ? 15 : -15 }}
          transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
        >
          <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
          <p className="text-base text-[#334155] leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}