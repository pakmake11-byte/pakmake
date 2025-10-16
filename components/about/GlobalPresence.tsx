'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useEffect } from 'react'

// ============================================================================
// Types & Constants
// ============================================================================

interface Office {
  location: string
  address: string
  details: string
  icon: string
}

interface MapLocation {
  lat: number
  lng: number
  name: string
}

interface MapOffice extends MapLocation {
  title: string
}

const OFFICES: Office[] = [
  {
    location: 'India HQ',
    address: 'Jaipur, Rajasthan',
    details: 'Main manufacturing and R&D facility',
    icon: '🇮🇳'
  },
  {
    location: 'UAE Office',
    address: 'Dubai, United Arab Emirates',
    details: 'Middle East operations center',
    icon: '🇦🇪'
  }
]

const MAP_OFFICES: MapOffice[] = [
  { title: '🇮🇳 INDIA HQ - Jaipur', name: 'India', lat: 26.9124, lng: 75.7873 },
  { title: '🇦🇪 UAE Office - Dubai', name: 'UAE', lat: 25.2048, lng: 55.2708 }
]

const SERVICE_LOCATIONS: MapLocation[] = [
  { lat: 7.8731, lng: 80.7718, name: '🇱🇰 Sri Lanka' },
  { lat: 23.6850, lng: 90.3563, name: '🇧🇩 Bangladesh' },
  { lat: 25.3548, lng: 51.1839, name: '🇶🇦 Oman' },
  { lat: 31.9454, lng: 35.9284, name: '🇯🇴 Jordan' },
  { lat: 24.7136, lng: 46.6753, name: '🇸🇦 Saudi Arabia' },
  { lat: -25.2744, lng: 133.7751, name: '🇦🇺 Australia' },
  { lat: 56.2639, lng: 9.5018, name: '🇩🇰 Denmark' },
  { lat: 51.9194, lng: 19.1451, name: '🇵🇱 Poland' },
  { lat: 51.1657, lng: 10.4515, name: '🇩🇪 Germany' },
  { lat: -30.5595, lng: 22.9375, name: '🇿🇦 South Africa' },
  { lat: 36.2048, lng: 138.2529, name: '🇯🇵 Japan' },
  { lat: 13.7563, lng: 100.5018, name: '🇹🇭 Thailand' },
  { lat: 38.9637, lng: 35.2433, name: '🇹🇷 Turkey' }
]

const SERVED_COUNTRIES = ['LK', 'BD', 'AE', 'OM', 'JO', 'SA', 'AU', 'DK', 'PL', 'DE', 'ZA', 'JP', 'TH', 'TR']

const COUNTRIES = [
  'India', 'Sri Lanka', 'Bangladesh', 'UAE', 'Oman', 'Jordan', 
  'Saudi Arabia', 'Australia', 'Denmark', 'Poland', 'Germany', 
  'South Africa', 'Japan', 'Thailand', 'Turkey'
]

// Map configuration constants
const MAP_CONFIG = {
  homeGeoPoint: { longitude: 20, latitude: 15 },
  homeZoomLevel: 1.5,
  maxZoomLevel: 4,
  minZoomLevel: 1.2,
  colors: {
    base: 0xf0f4f8,
    border: 0xe2e8f0,
    hover: 0xdbeafe,
    served: 0xbfdbfe,
    servedHover: 0x93c5fd,
    office: 0xef4444,
    service: 0x3b82f6,
    line: 0x3b82f6,
    white: 0xffffff
  }
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'tween', duration: 0.4, ease: 'easeOut' } 
  }
}

// ============================================================================
// Component
// ============================================================================

export function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView || !mapRef.current) return

    let root: any

    const initializeMap = async () => {
      try {
        const [am5, am5map, am5geodata, am5themes] = await Promise.all([
          import('@amcharts/amcharts5'),
          import('@amcharts/amcharts5/map'),
          import('@amcharts/amcharts5-geodata/worldIndiaLow'),
          import('@amcharts/amcharts5/themes/Animated')
        ])

        root = am5.Root.new(mapRef.current!)
        root.setThemes([am5themes.default.new(root)])

        const chart = createMapChart(root, am5, am5map)
        const polygonSeries = createPolygonSeries(root, chart, am5, am5map, am5geodata.default)
        
        createOfficeSeries(root, chart, am5, am5map)
        createLineSeries(root, chart, am5, am5map)
        createServiceSeries(root, chart, am5, am5map)

        chart.appear(1000, 100)
      } catch (error) {
        console.error('Failed to initialize map:', error)
      }
    }

    initializeMap()

    return () => {
      if (root) root.dispose()
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From our headquarters in India to offices across the globe,
            we serve customers in over 15 countries worldwide.
          </p>
        </motion.div>

        {/* Office Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {OFFICES.map((office) => (
            <motion.div
              key={office.location}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {office.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {office.location}
              </h3>
              <p className="text-blue-600 font-semibold mb-3 text-lg">
                {office.address}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {office.details}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 sm:p-10 mb-16 shadow-xl border border-gray-100"
        >
          <div
            ref={mapRef}
            style={{ width: '100%', height: '500px' }}
            className="rounded-xl overflow-hidden border border-gray-200"
            role="img"
            aria-label="Interactive world map showing global office locations and service areas"
          />
          
          {/* Map Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
            <LegendItem color="bg-red-500" label="Headquarters" />
            <LegendItem color="bg-blue-500" label="Service Locations" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-0.5 bg-blue-400 opacity-50"></div>
              <span className="text-gray-700 font-medium">Distribution Network</span>
            </div>
          </div>
        </motion.div>

        {/* Countries Served */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-10">
            Countries We Serve
          </h3>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {COUNTRIES.map((country) => (
              <motion.span
                key={country}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="bg-white text-gray-700 px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 hover:shadow-md transition-all duration-200 shadow-sm cursor-pointer border border-gray-200"
              >
                {country}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// Helper Components
// ============================================================================

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full ${color} shadow-sm`}></div>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
  )
}

// ============================================================================
// Map Creation Helpers
// ============================================================================

function createMapChart(root: any, am5: any, am5map: any) {
  return root.container.children.push(
    am5map.MapChart.new(root, {
      panX: 'rotateX',
      panY: 'translateY',
      projection: am5map.geoMercator(),
      homeGeoPoint: MAP_CONFIG.homeGeoPoint,
      homeZoomLevel: MAP_CONFIG.homeZoomLevel,
      maxZoomLevel: MAP_CONFIG.maxZoomLevel,
      minZoomLevel: MAP_CONFIG.minZoomLevel,
      wheelY: 'zoom'
    })
  )
}

function createPolygonSeries(root: any, chart: any, am5: any, am5map: any, geoData: any) {
  const series = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: geoData
    })
  )

  series.mapPolygons.template.setAll({
    tooltipText: '{name}',
    fill: am5.color(MAP_CONFIG.colors.base),
    stroke: am5.color(MAP_CONFIG.colors.border),
    strokeWidth: 0.8,
    interactive: true
  })

  series.mapPolygons.template.states.create('hover', {
    fill: am5.color(MAP_CONFIG.colors.hover),
    strokeWidth: 1.2
  })

  series.events.on('datavalidated', () => {
    series.mapPolygons.each((polygon: any) => {
      const dataContext = polygon.dataItem?.dataContext as any
      if (dataContext && SERVED_COUNTRIES.includes(dataContext.id)) {
        polygon.set('fill', am5.color(MAP_CONFIG.colors.served))
        polygon.states.create('hover', {
          fill: am5.color(MAP_CONFIG.colors.servedHover)
        })
      }
    })
  })

  return series
}

function createOfficeSeries(root: any, chart: any, am5: any, am5map: any) {
  const series = chart.series.push(am5map.MapPointSeries.new(root, {}))

  series.bullets.push(() => {
    const container = am5.Container.new(root, {})
    const pulse = container.children.push(
      am5.Circle.new(root, {
        radius: 15,
        fill: am5.color(MAP_CONFIG.colors.office),
        fillOpacity: 0.2
      })
    )

    pulse.animate({
      key: 'scale',
      from: 0.8,
      to: 1.5,
      duration: 2000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    })

    pulse.animate({
      key: 'opacity',
      from: 0.4,
      to: 0,
      duration: 2000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    })

    return am5.Bullet.new(root, { sprite: container })
  })

  MAP_OFFICES.forEach(office => {
    series.data.push({
      geometry: { type: 'Point', coordinates: [office.lng, office.lat] },
      title: office.title
    })
  })

  return series
}

function createLineSeries(root: any, chart: any, am5: any, am5map: any) {
  const series = chart.series.push(am5map.MapLineSeries.new(root, {}))
  
  series.mapLines.template.setAll({
    stroke: am5.color(MAP_CONFIG.colors.line),
    strokeOpacity: 0.3,
    strokeWidth: 1
  })

  const hq = MAP_OFFICES[0]
  SERVICE_LOCATIONS.forEach(loc => {
    series.data.push({
      geometry: {
        type: 'LineString',
        coordinates: [
          [hq.lng, hq.lat],
          [loc.lng, loc.lat]
        ]
      }
    })
  })

  return series
}

function createServiceSeries(root: any, chart: any, am5: any, am5map: any) {
  const series = chart.series.push(am5map.MapPointSeries.new(root, {}))

  series.bullets.push(() => {
    const circle = am5.Circle.new(root, {
      radius: 4,
      fill: am5.color(MAP_CONFIG.colors.service),
      stroke: am5.color(MAP_CONFIG.colors.white),
      strokeWidth: 1.5,
      tooltipText: '{name}',
      fillOpacity: 0.8
    })

    circle.states.create('hover', {
      scale: 1.5,
      fillOpacity: 1
    })

    return am5.Bullet.new(root, { sprite: circle })
  })

  SERVICE_LOCATIONS.forEach(loc => {
    series.data.push({
      geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
      name: loc.name
    })
  })

  return series
}