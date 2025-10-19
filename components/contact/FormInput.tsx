'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { itemVariants } from '@/lib/animations/variants'

interface FormInputProps {
  label: string
  icon: LucideIcon
  type?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function FormInput({ 
  label, 
  icon: Icon, 
  type = 'text',
  required = false,
  value, 
  onChange, 
  placeholder 
}: FormInputProps) {
  return (
    <motion.div variants={itemVariants}>
      <label className="text-sm font-semibold text-[#334155] mb-2 flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#00A0E3]" /> {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 sm:py-4 border-2 border-[#B3E5FC] rounded-xl focus:ring-4 focus:ring-[#E6F7FF] focus:border-[#00A0E3] transition-all outline-none hover:border-[#80D4F8] bg-white"
        placeholder={placeholder}
      />
    </motion.div>
  )
}