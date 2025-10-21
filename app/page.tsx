'use client'

import { HeroSection } from '../components/home/HeroSection'
import { ProductIntro } from '../components/home/ProductIntro'
import { ComparisonSection } from '../components/home/ComparisonSection'
import { EnvironmentalImpact } from '../components/home/EnvironmentalImpact'
import { TechnicalDeepDive } from '../components/home/TechnicalDeepDive'
import { ProductVariants } from '../components/home/ProductVariants'
import { IndustriesServed } from '../components/home/IndustriesServed'
import { SocialProof } from '../components/home/SocialProof'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ProductIntro />
      <ComparisonSection />
      <EnvironmentalImpact />
      <TechnicalDeepDive />
      <ProductVariants />
      <IndustriesServed />
      <SocialProof />
    </div>
  )
}