'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} 
        className="w-12 h-12 border-4 border-t-primary-500 border-gray-200 rounded-full"
      />
    </div>
  )
}
