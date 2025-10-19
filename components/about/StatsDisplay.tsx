'use client'

import { motion } from 'framer-motion'
import { createContainerVariants, itemVariants } from '@/lib/animations/variants'

interface Stat {
  label: string
  value?: string
}

interface StatsDisplayProps {
  stats: Stat[]
  isInView: boolean
  scrollDirection: number
}

export function StatsDisplay({ stats, isInView, scrollDirection }: StatsDisplayProps) {
  const containerVariants = createContainerVariants(scrollDirection)
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-wrap justify-center items-center gap-6 sm:gap-8"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-[#00A0E3] rounded-full"></span>
          <span className="text-sm sm:text-base text-[#334155] font-semibold">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}