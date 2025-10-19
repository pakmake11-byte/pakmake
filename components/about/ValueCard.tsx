'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { scaleInVariants } from '@/lib/animations/variants'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

interface ValueCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
  isInView: boolean
}

export function ValueCard({ 
  title, 
  description, 
  icon: Icon, 
  index, 
  isInView 
}: ValueCardProps) {
  return (
    <AnimatedCard>
      <div className="p-6 flex items-start gap-4">
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ 
            delay: 0.4 + index * 0.1
          }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.3 }
          }}
          className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#80D4F8] to-[#4DC4F5] rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
        
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
          <p className="text-base text-[#334155]">{description}</p>
        </div>
      </div>
    </AnimatedCard>
  )
}