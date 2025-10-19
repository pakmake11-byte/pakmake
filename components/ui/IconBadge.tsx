'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { scaleInVariants } from '@/lib/animations/variants'

interface IconBadgeProps {
  Icon: LucideIcon
  isInView: boolean
  delay?: number
  gradient?: string
}

export function IconBadge({ 
  Icon, 
  isInView, 
  delay = 0.2,
  gradient = 'from-blue-100 to-blue-200'
}: IconBadgeProps) {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}
    >
      <Icon className="w-8 h-8 text-primary-600" />
    </motion.div>
  )
}