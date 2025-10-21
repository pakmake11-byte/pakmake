'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { fadeInUpVariants, EASE_CUBIC } from '@/lib/animations/variants'
import { IconBadge } from './IconBadge'
import { GradientText } from './GradientText'

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  highlightedText: string
  subtitle?: string
  isInView: boolean
  iconGradient?: string
}

export function SectionHeader({ 
  icon, 
  title, 
  highlightedText, 
  subtitle, 
  isInView,
  iconGradient 
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center mb-4 sm:mb-8"
    >
      {icon && (
        <div className="mb-6">
          <IconBadge Icon={icon} isInView={isInView} gradient={iconGradient} />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}{' '}
        <GradientText isInView={isInView}>
          {highlightedText}
        </GradientText>
      </h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_CUBIC }}
          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
