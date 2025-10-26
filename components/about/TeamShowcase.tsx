'use client'

import { motion } from 'framer-motion'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createContainerVariants, createItemVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TeamMemberCard } from './TeamMemberCard'

const TEAM_MEMBERS = [
  {
    name: 'Pramila Jaju',
    role: 'Co-Founder',
    bio: 'MA (English), BSC (Science), BED (English)',
    linkedin: 'https://www.linkedin.com/in/pramila-jaju-3b0a571a5/',
    image: '/about/A.jpeg'
  },
  {
    name: 'Sandeep Jaju',
    role: 'Founder',
    bio: 'BCOM, MBA',
    linkedin: 'https://www.linkedin.com/in/sandeep-jaju-b8a3743a/',
    image: '/about/B.jpeg'
  },
  {
    name: 'Pranav Jaju',
    role: 'Co-Founder',
    bio: 'BBA, Pursuing MBA',
    linkedin: 'https://www.linkedin.com/in/pranav-jaju-34a9b52b6/',
    image: '/about/C.jpeg'
  }
]


export function TeamShowcase() {
  const { ref, isInView } = useInViewAnimation({ margin: '-100px' })
  const scrollDirection = useScrollDirection()
  const containerVariants = createContainerVariants(scrollDirection)
  const itemVariants = createItemVariants(scrollDirection)

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet Our"
          highlightedText="Leadership Team"
          subtitle="Driven by passion for sustainability and innovation, our founders bring decades of experience in transforming traditional logistics."
          isInView={isInView}
        />

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div key={`${member.name}-${index}`} variants={itemVariants}>
              <TeamMemberCard
                {...member}
                index={index}
                isInView={isInView}
                scrollDirection={scrollDirection}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}