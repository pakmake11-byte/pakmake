'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scaleInVariants, cardHoverVariants } from '@/lib/animations/variants'

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  linkedin: string
  index: number
  isInView: boolean
  image: string
  scrollDirection?: number
}

export function TeamMemberCard({
  name,
  role,
  bio,
  linkedin,
  image,
  index,
  isInView,
  scrollDirection = 1
}: TeamMemberCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full"
    >
      <div className="p-8 sm:p-10 text-center flex flex-col items-center space-y-5">

        {/* Animated Profile Image */}
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 + index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl"
        >
          <Image
            src={image}
            alt={name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Member Details */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: scrollDirection > 0 ? 20 : -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection > 0 ? 20 : -20 }}
          transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-[#00A0E3] font-semibold text-base">{role}</p>

          {/* Bio */}
          <p className="text-[#334155] text-sm leading-relaxed max-w-xs pt-2">
            {bio}
          </p>

          {/* LinkedIn Link */}
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 text-[#00A0E3] hover:text-[#007CB8] font-semibold text-sm transition-colors duration-200 pt-2"
          >
            <span>Connect on LinkedIn</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}
