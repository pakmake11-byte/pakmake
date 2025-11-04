'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { GradientText } from './GradientText'

interface AnimatedTextFromIconProps {
  text: string
  isInView: boolean
  delay?: number
  iconWidthRem?: number
}

export function AnimatedTextFromIcon({
  text,
  isInView,
  delay = 0.3,
  iconWidthRem = 5,
}: AnimatedTextFromIconProps) {
  const words = text.split(' ')

  let flatIndex = 0

  return (
    <span className="inline-flex flex-wrap items-center justify-center lg:justify-start">
      {words.map((word, wi) => {
        const chars = Array.from(word)

        return (
          <span
            key={`word-${wi}`}
            className="inline-block whitespace-nowrap mr-2 last:mr-0"
            aria-hidden
          >
            {chars.map((char, ci) => {
              const myIndex = flatIndex
              flatIndex += 1

              return (
                <motion.span
                  key={`char-${wi}-${ci}`}
                  initial={{ x: `-${iconWidthRem}rem`, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.4,
                            ease: 'easeOut',
                            delay: delay + myIndex * 0.04,
                          },
                        }
                      : { x: `-${iconWidthRem}rem`, opacity: 0 }
                  }
                  className="inline-block"
                >
                  <GradientText
                    isInView={isInView}
                    delay={delay + myIndex * 0.04}
                    gradient={'from-primary-600 to-primary-800'}
                  >
                    {char}
                  </GradientText>
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
