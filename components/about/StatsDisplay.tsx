'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { createContainerVariants, createItemVariants } from '@/lib/animations/variants'

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
  const containerVariants = useMemo(() => createContainerVariants(scrollDirection), [scrollDirection])
  const itemVariants = useMemo(() => createItemVariants(scrollDirection), [scrollDirection])
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="flex items-center gap-3 group"
        >
          <span className="w-2 h-2 bg-[#00A0E3] rounded-full" />
          <span className="text-sm sm:text-base text-[#334155] font-semibold group-hover:text-[#00A0E3] transition-colors">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}