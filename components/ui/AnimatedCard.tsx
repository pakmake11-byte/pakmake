'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { itemVariants } from '@/lib/animations/variants'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  hoverY?: number
  showGradientOverlay?: boolean
}

export function AnimatedCard({ 
  children, 
  className = '',
  hoverY = -8,
  showGradientOverlay = true
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: hoverY, transition: { duration: 0.3 } }}
      className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-200 overflow-hidden group ${className}`}
    >
      {showGradientOverlay && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/30 to-purple-50/40 pointer-events-none"
        />
      )}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}