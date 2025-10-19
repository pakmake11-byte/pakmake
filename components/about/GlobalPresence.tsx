'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Globe2, MapPin } from 'lucide-react'

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

type Root = {
  setThemes: (themes: unknown[]) => void
  container: {
    children: {
      push: (chart: unknown) => MapChart
    }
  }
  dispose: () => void
}

type MapChart = {
  series: {
    push: (series: unknown) => MapPolygonSeries | MapPointSeries | MapLineSeries
  }
  appear: (duration: number, delay: number) => void
}

type MapPolygonSeries = {
  mapPolygons: {
    template: {
      setAll: (config: unknown) => void
      states: {
        create: (state: string, config: unknown) => void
      }
    }
    each: (callback: (polygon: MapPolygon) => void) => void
  }
  events: {
    on: (event: string, callback: () => void) => void
  }
}

type MapPolygon = {
  dataItem?: {
    dataContext?: {
      id: string
    }
  }
  set: (key: string, value: unknown) => void
  states: {
    create: (state: string, config: unknown) => void
  }
}

type MapPointSeries = {
  bullets: {
    push: (callback: () => Bullet) => void
  }
  data: {
    push: (data: unknown) => void
  }
}

type MapLineSeries = {
  mapLines: {
    template: {
      setAll: (config: unknown) => void
    }
  }
  data: {
    push: (data: unknown) => void
  }
}

type Bullet = unknown

type AmChartsModule = {
  Root: {
    new: (element: HTMLElement) => Root
  }
  Container: {
    new: (root: Root, config: unknown) => Container
  }
  Circle: {
    new: (root: Root, config: unknown) => Circle
  }
  Bullet: {
    new: (root: Root, config: { sprite: unknown }) => Bullet
  }
  color: (value: number) => unknown
  ease: {
    out: (easing: unknown) => unknown
    cubic: unknown
  }
}

type Container = {
  children: {
    push: (child: unknown) => Circle
  }
}

type Circle = {
  animate: (config: AnimateConfig) => void
  states: {
    create: (state: string, config: unknown) => void
  }
}

type AnimateConfig = {
  key: string
  from: number
  to: number
  duration: number
  easing: unknown
  loops: number
}

type AmMapModule = {
  MapChart: {
    new: (root: Root, config: unknown) => MapChart
  }
  MapPolygonSeries: {
    new: (root: Root, config: { geoJSON: unknown }) => MapPolygonSeries
  }
  MapPointSeries: {
    new: (root: Root, config: object) => MapPointSeries
  }
  MapLineSeries: {
    new: (root: Root, config: object) => MapLineSeries
  }
  geoMercator: () => unknown
}

type AmThemesModule = {
  default: {
    new: (root: Root) => unknown
  }
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.9,
      ease: [0.65, 0, 0.35, 1]
    }
  }
}

const countryVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1]
    }
  }
}

export function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (!isInView || !mapRef.current) return

    let root: Root | null = null

    const initializeMap = async () => {
      try {
        const [am5, am5map, am5geodata, am5themes] = await Promise.all([
          import('@amcharts/amcharts5') as unknown as AmChartsModule,
          import('@amcharts/amcharts5/map') as unknown as AmMapModule,
          import('@amcharts/amcharts5-geodata/worldIndiaLow'),
          import('@amcharts/amcharts5/themes/Animated') as unknown as AmThemesModule
        ])

        root = am5.Root.new(mapRef.current!)
        root.setThemes([am5themes.default.new(root)])

        const chart = createMapChart(root, am5, am5map)
        createPolygonSeries(root, chart, am5, am5map, am5geodata.default)
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
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 shadow-lg"
          >
            <Globe2 className="w-10 h-10 text-blue-600" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Global <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Presence</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From our headquarters in India to offices across the globe,
            we serve customers in over 15 countries worldwide.
          </p>
        </motion.div>

        {/* Office Cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {OFFICES.map((office) => (
            <motion.div
              key={office.location}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/30 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative p-8 sm:p-10 text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl drop-shadow-md mb-6"
                >
                  {office.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {office.location}
                </h3>
                <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold mb-3 text-lg">
                  <MapPin className="w-5 h-5" />
                  {office.address}
                </div>
                <p className="text-gray-600 text-base">
                  {office.details}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 shadow-xl border border-gray-200"
        >
          <div
            ref={mapRef}
            style={{ width: '100%', height: '500px' }}
            className="rounded-xl overflow-hidden border border-gray-200"
            role="img"
            aria-label="Interactive world map showing global office locations and service areas"
          />

          {/* Map Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8">
            <LegendItem color="bg-red-500" label="Headquarters" />
            <LegendItem color="bg-blue-500" label="Service Locations" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-0.5 bg-blue-400 opacity-50"></div>
              <span className="text-gray-700 font-semibold text-sm">Distribution Network</span>
            </div>
          </div>
        </motion.div>

        {/* Countries Served */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
            Countries We <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Serve</span>
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {COUNTRIES.map((country) => (
              <motion.span
                key={country}
                variants={countryVariants}
                whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.3 } }}
                className="bg-white text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer border border-gray-200"
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

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full ${color} shadow-sm`}></div>
      <span className="text-gray-700 font-semibold text-sm">{label}</span>
    </div>
  )
}

function createMapChart(root: Root, am5: AmChartsModule, am5map: AmMapModule) {
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
  ) as MapChart
}

function createPolygonSeries(root: Root, chart: MapChart, am5: AmChartsModule, am5map: AmMapModule, geoData: unknown) {
  const series = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: geoData
    })
  ) as MapPolygonSeries

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
    series.mapPolygons.each((polygon: MapPolygon) => {
      const dataContext = polygon.dataItem?.dataContext
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

function createOfficeSeries(root: Root, chart: MapChart, am5: AmChartsModule, am5map: AmMapModule) {
  const series = chart.series.push(am5map.MapPointSeries.new(root, {})) as MapPointSeries

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

function createLineSeries(root: Root, chart: MapChart, am5: AmChartsModule, am5map: AmMapModule) {
  const series = chart.series.push(am5map.MapLineSeries.new(root, {})) as MapLineSeries

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

function createServiceSeries(root: Root, chart: MapChart, am5: AmChartsModule, am5map: AmMapModule) {
  const series = chart.series.push(am5map.MapPointSeries.new(root, {})) as MapPointSeries

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