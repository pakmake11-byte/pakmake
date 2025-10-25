'use client';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface StatsCounterProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

export function StatsCounter({ value, suffix = '', className = '', duration = 2 }: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / (duration * 60)
      const interval = setInterval(() => {
        setCount(prev => {
          const next = prev + increment
          if (next >= value) {
            clearInterval(interval)
            return value
          }
          return next
        })
      }, 16) // ~60fps
    }, 500)

    return () => clearTimeout(timer)
  }, [value, duration])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Math.floor(count).toLocaleString()}{suffix && ' '}{suffix}    </motion.span>
  )
}