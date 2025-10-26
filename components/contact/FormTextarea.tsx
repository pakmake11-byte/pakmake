'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { itemVariants, EASE_CUBIC } from '@/lib/animations/variants'

interface FormTextareaProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
  rows?: number
  error?: string
  maxLength?: number
}

export function FormTextarea({ 
  label, 
  required = false,
  value, 
  onChange, 
  placeholder,
  rows = 6,
  error,
  maxLength = 1000
}: FormTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const charCount = value.length
  const maxChars = maxLength
  const percentage = (charCount / maxChars) * 100
  const hasError = !!error

  return (
    <motion.div 
      variants={itemVariants}
      className="relative"
    >
      <label className="text-sm font-semibold text-[#334155] mb-2 flex items-center gap-2">
        <motion.div
          animate={{ 
            rotate: isFocused ? 360 : 0,
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE_CUBIC }}
        >
          <MessageSquare className="w-4 h-4 text-[#00A0E3]" />
        </motion.div>
        {label} {required && <span className="text-[#00A0E3]">*</span>}
      </label>

      <div className="relative">
        <motion.textarea
          required={required}
          rows={rows}
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onChange(e.target.value)
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`relative w-full px-4 py-3 sm:py-4 border-2 ${
            hasError ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-[#B3E5FC] focus:border-[#00A0E3] focus:ring-[#E6F7FF]'
          } rounded-xl focus:ring-4 transition-all outline-none resize-vertical hover:border-[#80D4F8] bg-white`}
          placeholder={placeholder}
          animate={{
            scale: isFocused ? 1.005 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Character counter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isFocused || charCount > 0 ? 1 : 0,
            y: isFocused || charCount > 0 ? 0 : -10,
          }}
          className="absolute bottom-3 right-3 flex items-center gap-2"
        >
          {/* Progress circle */}
          <svg className="w-8 h-8 transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke="#E6F7FF"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="16"
              cy="16"
              r="12"
              stroke={hasError ? '#ef4444' : percentage > 90 ? '#f59e0b' : '#00A0E3'}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 12}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 12 * (1 - percentage / 100),
              }}
              transition={{ duration: 0.3, ease: EASE_CUBIC }}
            />
          </svg>
          <span className={`text-xs font-medium ${
            percentage > 90 ? 'text-amber-600' : 'text-[#334155]'
          }`}>
            {charCount}/{maxChars}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}