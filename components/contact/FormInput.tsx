'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { itemVariants, EASE_CUBIC } from '@/lib/animations/variants'

interface FormInputProps {
  label: string
  icon: LucideIcon
  type?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  maxLength?: number
}

export function FormInput({
  label,
  icon: Icon,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  error,
  maxLength
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasError = !!error
  const charPercentage = maxLength ? (value.length / maxLength) * 100 : 0

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
    >
      <label className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
        <motion.div
          animate={{
            rotate: isFocused ? [0, 360] : 0,
            scale: isFocused ? 1.15 : 1,
          }}
          transition={{
            rotate: { duration: 0.4, ease: EASE_CUBIC },
            scale: { duration: 0.2 }
          }}
          className="relative"
        >
          <Icon className="w-4 h-4 text-primary-500" />

          {/* Icon glow on focus */}
          <motion.div
            className="absolute inset-0 blur-md"
            animate={{
              opacity: isFocused ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="w-4 h-4 text-primary-500" />
          </motion.div>
        </motion.div>

        <span>
          {label} {required && <span className="text-primary-500">*</span>}
        </span>

        {/* Character count aligned to right side of label */}
        {maxLength && (
          <div className="ml-auto flex items-center text-xs text-gray-500">
            <motion.span
              animate={charPercentage > 90 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className={charPercentage > 90 ? 'text-amber-600' : ''}
            >
              {value.length}/{maxLength}
            </motion.span>
            {charPercentage > 90 && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-1"
              >
              </motion.span>
            )}
          </div>
        )}
      </label>

      <div className="relative">
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          animate={{
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '2px',
            background: 'linear-gradient(90deg, #00A0E3, #007CB8, #00A0E3)',
            backgroundSize: '200% 100%',
          }}
        >
          <motion.div
            className="w-full h-full bg-white rounded-xl"
            animate={isFocused ? {
              backgroundPosition: ['0% 0%', '100% 0%'],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          className={`relative w-full px-4 py-3 sm:py-4 border-2 ${hasError
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-primary-100 focus:border-primary-500 focus:ring-primary-50'
            } rounded-xl focus:ring-4 transition-all outline-none hover:border-primary-200 bg-white`}
          placeholder={placeholder}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  )
}
