'use client'

import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations/variants'

interface FormTextareaProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
  rows?: number
}

export function FormTextarea({ 
  label, 
  required = false,
  value, 
  onChange, 
  placeholder,
  rows = 6
}: FormTextareaProps) {
  return (
    <motion.div variants={itemVariants}>
      <label className="block text-sm font-semibold text-[#334155] mb-2">
        {label} {required && '*'}
      </label>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 sm:py-4 border-2 border-[#B3E5FC] rounded-xl focus:ring-4 focus:ring-[#E6F7FF] focus:border-[#00A0E3] transition-all outline-none resize-vertical hover:border-[#80D4F8] bg-white"
        placeholder={placeholder}
      />
    </motion.div>
  )
}