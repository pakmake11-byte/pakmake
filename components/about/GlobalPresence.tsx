'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe2 } from 'lucide-react'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { createContainerVariants, fadeInUpVariants, EASE_CUBIC } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { OfficeCard } from './OfficeCard'
import { MapLegend } from './MapLegend'
import { GradientText } from '@/components/ui/GradientText'
import { CountryBadges } from './CountryBadges'
import { MapControls } from './MapControls'
import { initializeMap } from './mapInitializer'
import type { MapControlHandlers } from './mapInitializer'

import { GLOBAL_OFFICES, COUNTRIES } from '@/data/globalPresenceData'

export function GlobalPresence() {
  const { ref: sectionRef, isInView } = useInViewAnimation()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const scrollDirection = useScrollDirection()
  const containerVariants = createContainerVariants(scrollDirection)
  const [mapControls, setMapControls] = useState<MapControlHandlers | null>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapError, setMapError] = useState(false)

  const initializingRef = useRef(false)
  const rootRef = useRef<{ dispose?: () => void } | null>(null)

  useEffect(() => {
    // Skip if already initializing or initialized successfully
    if (initializingRef.current || rootRef.current) return
    if (!mapRef.current) return

    let mounted = true
    initializingRef.current = true

    const setupMap = async () => {
      try {
        // Add small delay to ensure DOM is fully ready
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (!mounted || !mapRef.current) return

        const result = await initializeMap(mapRef.current)
        
        if (!mounted) {
          result?.root?.dispose?.()
          return
        }

        if (result) {
          rootRef.current = result.root
          setMapControls(result.controls)
          setMapLoading(false)
          setMapError(false)
          console.log('Map initialized successfully')
        } else {
          console.error('Map initialization returned null')
          setMapLoading(false)
          setMapError(true)
          // Reset flag to allow retry on next mount
          initializingRef.current = false
        }
      } catch (error) {
        console.error('Map setup error:', error)
        setMapLoading(false)
        setMapError(true)
        // Reset flag to allow retry
        initializingRef.current = false
      }
    }

    setupMap()

    return () => {
      mounted = false
      if (rootRef.current) {
        rootRef.current.dispose?.()
        rootRef.current = null
      }
      setMapControls(null)
      initializingRef.current = false
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-32 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Globe2}
          title="Global"
          highlightedText="Presence"
          subtitle="From our headquarters in India to offices across the globe, we serve customers in over 15 countries worldwide."
          isInView={isInView}
        />

        {/* Office Cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {GLOBAL_OFFICES.map((office) => (
            <OfficeCard key={office.location} {...office} />
          ))}
        </motion.div>

        <InteractiveMap 
          mapRef={mapRef} 
          isInView={isInView} 
          mapControls={mapControls}
          loading={mapLoading}
          error={mapError}
        />
        <CountriesServed isInView={isInView} />
      </div>
    </section>
  )
}

// -------------------- Interactive Map --------------------
interface InteractiveMapProps {
  mapRef: React.RefObject<HTMLDivElement | null>
  isInView: boolean
  mapControls: MapControlHandlers | null
  loading: boolean
  error: boolean
}

function InteractiveMap({ mapRef, isInView, mapControls, loading, error }: InteractiveMapProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, ease: EASE_CUBIC, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 shadow-xl border border-[#B3E5FC] relative"
    >
      {mapControls && (
        <MapControls
          onZoomIn={mapControls.zoomIn}
          onZoomOut={mapControls.zoomOut}
          onReset={mapControls.reset}
          onMoveUp={mapControls.moveUp}
          onMoveDown={mapControls.moveDown}
          onMoveLeft={mapControls.moveLeft}
          onMoveRight={mapControls.moveRight}
        />
      )}
      
      <div
        ref={mapRef}
        style={{ width: '100%', height: '500px' }}
        className="rounded-xl overflow-hidden border border-[#B3E5FC] relative"
        role="img"
        aria-label="Interactive world map showing global office locations and service areas"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#B3E5FC] border-t-[#00A0E3] mb-4"></div>
              <p className="text-gray-600 font-medium">Loading map...</p>
            </div>
          </div>
        )}
        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center px-4">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-gray-900 font-semibold mb-2">Unable to load map</p>
              <p className="text-gray-600 text-sm">Please refresh the page to try again</p>
            </div>
          </div>
        )}
      </div>
      <MapLegend />
    </motion.div>
  )
}

// -------------------- Countries Served --------------------
interface CountriesServedProps {
  isInView: boolean
}

function CountriesServed({ isInView }: CountriesServedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE_CUBIC, delay: 0.3 }}
      className="text-center"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
        Countries We{' '}
        <GradientText isInView={isInView} delay={0.5}>
          Serve
        </GradientText>
      </h3>
      <CountryBadges
        countries={COUNTRIES}
      />
    </motion.div>
  )
}