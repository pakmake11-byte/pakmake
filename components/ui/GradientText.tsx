'use client'

import { motion, Easing } from 'framer-motion'
import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  isInView: boolean
  delay?: number
  gradient?: string
}

export function createGradientAnimation(delay = 0): {
  initial: { backgroundPosition: string }
  animate: { backgroundPosition: string }
  transition: {
    duration: number
    ease: Easing | Easing[]
    delay: number
  }
} {
  return {
    initial: { backgroundPosition: '0% 50%' },
    animate: { backgroundPosition: '100% 50%' },
    transition: {
      duration: 2,
      ease: 'easeInOut',
      delay
    }
  }
}

export function GradientText({
  children,
  isInView,
  delay = 0.3,
  gradient = 'from-primary-600 to-primary-800'
}: GradientTextProps) {
  const animation = createGradientAnimation(delay)

  return (
    <motion.span
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      // className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            className={`text-primary-700 ${gradient}`}

      style={{ backgroundSize: '200% 200%' }}
    >
      {children}
    </motion.span>
  )
}
