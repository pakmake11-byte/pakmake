'use client'

import { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion'
import { HeroSection } from '../components/home/HeroSection'
import { ProductIntro } from '../components/home/ProductIntro'
import { ComparisonSection } from '../components/home/ComparisonSection'
import { EnvironmentalImpact } from '../components/home/EnvironmentalImpact'
import { TechnicalDeepDive } from '../components/home/TechnicalDeepDive'
import { ProductVariants } from '../components/home/ProductVariants'
import { IndustriesServed } from '../components/home/IndustriesServed'
import { SocialProof } from '../components/home/SocialProof'
import { SlipSheetModel } from '../components/three/SlipSheetModel'

export default function Home() {
  const heroModelRef = useRef<HTMLDivElement>(null)
  const introModelRef = useRef<HTMLDivElement>(null)
  const animationContainerRef = useRef<HTMLDivElement>(null)

  const startX = useMotionValue(0)
  const startY = useMotionValue(0)
  const startWidth = useMotionValue(0)
  const startHeight = useMotionValue(0)
  
  const endX = useMotionValue(0)
  const endY = useMotionValue(0)
  const endWidth = useMotionValue(0)
  const endHeight = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: animationContainerRef,
    offset: ['start start', 'end end'],
  })

  const progress = useTransform(scrollYProgress, (v) => Math.max(0, Math.min(1, v)))

  const updateDimensions = useCallback(() => {
    if (heroModelRef.current && introModelRef.current) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      const heroRect = heroModelRef.current.getBoundingClientRect()
      const introRect = introModelRef.current.getBoundingClientRect()
      
      animate(startX, heroRect.left, { duration: 0 })
      animate(startY, heroRect.top + scrollTop, { duration: 0 })
      animate(startWidth, heroRect.width, { duration: 0 })
      animate(startHeight, heroRect.height, { duration: 0 })
      
      animate(endX, introRect.left, { duration: 0 })
      animate(endY, introRect.top + scrollTop, { duration: 0 })
      animate(endWidth, introRect.width, { duration: 0 })
      animate(endHeight, introRect.height, { duration: 0 })
    }
  }, [startX, startY, startWidth, startHeight, endX, endY, endWidth, endHeight])

  useLayoutEffect(() => {
    updateDimensions()

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensions)
    })

    if (animationContainerRef.current) {
      resizeObserver.observe(animationContainerRef.current)
    }
    if (heroModelRef.current) {
      resizeObserver.observe(heroModelRef.current)
    }
    if (introModelRef.current) {
      resizeObserver.observe(introModelRef.current)
    }

    window.addEventListener('resize', updateDimensions)
    window.addEventListener('load', updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('load', updateDimensions)
    }
  }, [updateDimensions])

  const modelX = useTransform(() => {
    const p = progress.get()
    return startX.get() + (endX.get() - startX.get()) * p
  })
  
  const modelY = useTransform(() => {
    const p = progress.get()
    return startY.get() + (endY.get() - startY.get()) * p
  })
  
  const modelWidth = useTransform(() => {
    const p = progress.get()
    return startWidth.get() + (endWidth.get() - startWidth.get()) * p
  })
  
  const modelHeight = useTransform(() => {
    const p = progress.get()
    return startHeight.get() + (endHeight.get() - startHeight.get()) * p
  })

  const [hasStarted, setHasStarted] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={animationContainerRef} className="relative">
        {hasStarted && (
          <motion.div
            className="fixed top-0 left-0 z-10 pointer-events-none"
            style={{
              x: modelX,
              y: modelY,
              width: modelWidth,
              height: modelHeight,
              willChange: 'transform',
            }}
          >
            <SlipSheetModel />
          </motion.div>
        )}

        <HeroSection ref={heroModelRef} />
        <ProductIntro ref={introModelRef} />
      </div>

      <ComparisonSection />
      <EnvironmentalImpact />
      <TechnicalDeepDive />
      <ProductVariants />
      <IndustriesServed />
      <SocialProof />
    </div>
  )
}