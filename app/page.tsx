'use client'

import { HeroSection } from '../components/home/HeroSection'
import { ProductIntro } from '../components/home/ProductIntro'
import { ComparisonSection } from '../components/home/ComparisonSection'
import { EnvironmentalImpact } from '../components/home/EnvironmentalImpact'
import { TechnicalDeepDive } from '../components/home/TechnicalDeepDive'
import { ProductVariants } from '../components/home/ProductVariants'
import { IndustriesServed } from '../components/home/IndustriesServed'
import { SocialProof } from '../components/home/SocialProof'
import { PageAudioWrapper } from '@/components/ui/PageAudioWrapper'

export default function Home() {
  return (
    <PageAudioWrapper>
      <div className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ProductIntro />
        <ComparisonSection />
        <EnvironmentalImpact />
        <TechnicalDeepDive />
        <ProductVariants />
        <IndustriesServed />
        <SocialProof />
      </div>
    </PageAudioWrapper>
  )
}