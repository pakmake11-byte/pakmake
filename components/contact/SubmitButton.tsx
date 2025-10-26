'use client'

import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { itemVariants } from '@/lib/animations/variants'

interface SubmitButtonProps {
  isSubmitting: boolean
  text?: string
  disabled?: boolean
}

export function SubmitButton({ isSubmitting, text = 'Send Message', disabled }: SubmitButtonProps) {
  const isDisabled = isSubmitting || disabled

  return (
    <motion.div variants={itemVariants} className="text-center">
      <motion.button
        type="submit"
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        className="relative w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl inline-flex items-center justify-center gap-3 overflow-hidden group"
      >
        {/* Animated background shine */}
        {!isDisabled && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut"
              }}
            />
            
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 bg-primary-400/50 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        {/* Floating particles when hovering */}
        {!isDisabled && !isSubmitting && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30],
                  x: [0, (i - 2) * 15],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                }}
              >
              </motion.div>
            ))}
          </>
        )}

        <span className="relative z-10">
          {isSubmitting ? (
            <motion.span
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" />
              </motion.div>
              <span>Sending...</span>
            </motion.span>
          ) : (
            <motion.span
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span>{text}</span>
              <motion.div
                animate={!isDisabled ? {
                  x: [0, 5, 0],
                  rotate: [0, 15, 0],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            </motion.span>
          )}
        </span>

        {/* Pulsing ring on hover */}
        {!isDisabled && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{
                scale: [1, 1.1, 1.2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{
                scale: [1, 1.15, 1.3],
                opacity: [0.3, 0.15, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2,
              }}
            />
          </>
        )}
      </motion.button>
    </motion.div>
  )
}