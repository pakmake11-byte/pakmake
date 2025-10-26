import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseInViewAnimationOptions {
  once?: boolean
  margin?: string | number
  amount?: number
}

export function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  
  const isInView = useInView(ref, {
    once: options.once ?? false,
    margin: options.margin,
    amount: options.amount 
  } as Parameters<typeof useInView>[1])

  return { ref, isInView }
}