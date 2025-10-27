'use client'

import { motion, Variants } from 'framer-motion'
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
    const letters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: 0.04, // letter interval
            },
        },
    }

    const letter: Variants = {
        hidden: { x: `-${iconWidthRem}rem`, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    }

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="inline-block overflow-hidden"
        >
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={letter}
                    className="inline-block"
                >
                    <GradientText
                        isInView={isInView}
                        delay={delay + index * 0.04}
                        gradient={'from-primary-600 to-primary-800'}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </GradientText>
                </motion.span>
            ))}
        </motion.span>
    )
}
