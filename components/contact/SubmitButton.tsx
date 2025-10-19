'use client'

import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { itemVariants } from '@/lib/animations/variants'

interface SubmitButtonProps {
  isSubmitting: boolean
  text?: string
}

export function SubmitButton({ isSubmitting, text = 'Send Message' }: SubmitButtonProps) {
  return (
    <motion.div variants={itemVariants} className="text-center pt-4">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-gradient-to-r from-[#00A0E3] to-[#007CB8] text-white px-10 sm:px-12 py-4 rounded-full text-lg font-semibold hover:from-[#007CB8] hover:to-[#005F8C] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>{text}</span>
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.div>
  )
}