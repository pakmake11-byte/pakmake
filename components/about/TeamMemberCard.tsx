'use client'

import { motion } from 'framer-motion'
import { User, ArrowRight } from 'lucide-react'
import { scaleInVariants } from '@/lib/animations/variants'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  linkedin: string
  index: number
  isInView: boolean
}

export function TeamMemberCard({
  name,
  role,
  bio,
  linkedin,
  index,
  isInView
}: TeamMemberCardProps) {
  return (
    <AnimatedCard>
      <div className="p-10 text-center flex flex-col items-center space-y-4">

        {/* Animated Profile Icon */}
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 + index * 0.1 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          className="w-40 h-40 bg-gradient-to-br from-[#B3E5FC] to-[#80D4F8] rounded-full flex items-center justify-center shadow-lg"
        >
          <User className="w-20 h-20 text-[#007CB8]" />
        </motion.div>

        <div className="space-y-2">
          {/* Member Details */}

          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-[#00A0E3] font-semibold text-base">{role}</p>

          {/* Bio */}
          <p className="text-[#334155] text-sm leading-relaxed max-w-xs">
            {bio}
          </p>

          {/* LinkedIn Link */}
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 text-[#00A0E3] hover:text-[#007CB8] font-semibold text-sm transition-colors duration-200"
          >
            <span>Connect on LinkedIn</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </AnimatedCard>
  )
}
