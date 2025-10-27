'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { fadeInUpVariants, EASE_CUBIC } from '@/lib/animations/variants'
import { IconBadge } from './IconBadge'
import { AnimatedTextFromIcon } from './AnimatedTextFromIcon'

interface SectionHeaderProps {
  icon?: LucideIcon
  title?: string
  highlightedText: string
  subtitle?: string
  isInView: boolean
  iconGradient?: string
}

export function SectionHeader({
  icon,
  title = "",
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
      {/* Responsive layout: vertical on mobile, horizontal on large */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">

        {/* “Train exiting tunnel” text animation */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="overflow-hidden" // This hides text before it “emerges”
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {icon && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex-shrink-0 p-1"
              >
                <IconBadge Icon={icon} isInView={isInView} gradient={iconGradient} />
              </motion.div>
            )}

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left overflow-hidden"
            >
              <AnimatedTextFromIcon
                text={`${title} ${highlightedText}`}
                isInView={isInView}
                delay={0.4}
              />
            </motion.h2>
          </div>

        </motion.div>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE_CUBIC }}
          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>

  )
}