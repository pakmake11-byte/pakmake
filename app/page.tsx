'use client'

import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { HeroSection } from '../components/home/HeroSection'
import { ProductIntro } from '../components/home/ProductIntro'
import { ComparisonSection } from '../components/home/ComparisonSection'
import { EnvironmentalImpact } from '../components/home/EnvironmentalImpact'
import { TechnicalDeepDive } from '../components/home/TechnicalDeepDive'
import { ProductVariants } from '../components/home/ProductVariants'
import { IndustriesServed } from '../components/home/IndustriesServed'
import { SocialProof } from '../components/home/SocialProof'
import { SlipSheetModel } from '../components/three/SlipSheetModel'

const getDimensions = (el: HTMLElement) => {
  if (!el) return { height: 0, width: 0, top: 0, left: 0 }
  
  const rect = el.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    height: rect.height,
    width: rect.width,
    top: rect.top + scrollTop,
    left: rect.left,
  }
}

export default function Home() {
  const heroModelRef = useRef<HTMLDivElement>(null)
  const introModelRef = useRef<HTMLDivElement>(null)
  const animationContainerRef = useRef<HTMLDivElement>(null)

  const [modelDimensions, setModelDimensions] = useState({
    start: { height: 0, width: 0, top: 0, left: 0 },
    end: { height: 0, width: 0, top: 0, left: 0 },
  })

  const { scrollYProgress } = useScroll({
    target: animationContainerRef,
    offset: ['start start', 'end end'],
  })

  const updateDimensions = useCallback(() => {
    if (heroModelRef.current && introModelRef.current) {
      const start = getDimensions(heroModelRef.current)
      const end = getDimensions(introModelRef.current)
      
      setModelDimensions({ start, end })
    }
  }, [])

  useLayoutEffect(() => {
    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    
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

  const modelX = useTransform(scrollYProgress, [0, 1], [modelDimensions.start.left, modelDimensions.end.left])
  const modelY = useTransform(scrollYProgress, [0, 1], [modelDimensions.start.top, modelDimensions.end.top])
  const modelWidth = useTransform(scrollYProgress, [0, 1], [modelDimensions.start.width, modelDimensions.end.width])
  const modelHeight = useTransform(scrollYProgress, [0, 1], [modelDimensions.start.height, modelDimensions.end.height])

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={animationContainerRef} className="relative">
        {modelDimensions.start.width > 0 && (
          <motion.div
            className="absolute top-0 left-0 z-10 pointer-events-none"
            style={{
              x: modelX,
              y: modelY,
              width: modelWidth,
              height: modelHeight,
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