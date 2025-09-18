import { Suspense } from 'react';
import type { Metadata } from 'next';
// import HeroSection from '@/components/home/HeroSection';
// import StatsCounter from '@/components/home/StatsCounter';
// import ProductIntro from '@/components/home/ProductIntro';
// import ComparisonSection from '@/components/home/ComparisonSection';
// import EnvironmentalImpact from '@/components/home/EnvironmentalImpact';
// import TechnicalDeepDive from '@/components/home/TechnicalDeepDive';
// import ProductVariants from '@/components/home/ProductVariants';
// import MaterialComparison from '@/components/home/MaterialComparison';
// import IndustriesServed from '@/components/home/IndustriesServed';
// import SocialProof from '@/components/home/SocialProof';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// export const metadata: Metadata = {
//   title: 'Home',
//   description: '80% Cheaper. 12% More Capacity. 100% Sustainable. Revolutionary slip sheet solutions that transform your logistics operations.',
//   openGraph: {
//     title: 'PakMaker Packaging Inc® - Revolutionary Slip Sheet Solutions',
//     description: 'Transform your logistics with slip sheets that reduce costs by 80%, increase capacity by 12-15%, and are 100% sustainable.',
//     images: ['/images/home-og.jpg'],
//   },
// };

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* <Suspense fallback={<div className="h-screen bg-gradient-to-br from-primary-900 to-primary-700" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <StatsCounter />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ProductIntro />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <ComparisonSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-success-50 animate-pulse" />}>
        <EnvironmentalImpact />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
        <TechnicalDeepDive />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-primary-50 animate-pulse" />}>
        <ProductVariants />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <MaterialComparison />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <IndustriesServed />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gradient-to-br from-primary-50 to-accent-50 animate-pulse" />}>
        <SocialProof />
      </Suspense> */}
    </div>
  );
}