'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useEffect } from 'react'

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
  size: number
}

export function GlobalPresence() {
  const ref = useRef<HTMLElement>(null)
  const worldChartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView || !worldChartRef.current) return

    let worldRoot: any

    const initMaps = async () => {
      const am5 = await import('@amcharts/amcharts5')
      const am5map = await import('@amcharts/amcharts5/map')
      const am5geodata_worldIndiaLow = await import('@amcharts/amcharts5-geodata/worldIndiaLow')
      const am5themes_Animated = await import('@amcharts/amcharts5/themes/Animated')

      worldRoot = am5.Root.new(worldChartRef.current!)
      worldRoot.setThemes([am5themes_Animated.default.new(worldRoot)])

      const worldChart = worldRoot.container.children.push(
        am5map.MapChart.new(worldRoot, {
          panX: "rotateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
          homeGeoPoint: { longitude: 55, latitude: 20 },
          homeZoomLevel: 1.5,
          maxZoomLevel: 4,
          minZoomLevel: 1.2,
          wheelY: "zoom"
        })
      )

      const worldSeries = worldChart.series.push(
        am5map.MapPolygonSeries.new(worldRoot, {
          geoJSON: am5geodata_worldIndiaLow.default
        })
      )

      worldSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        fill: am5.color(0xf0f4f8),
        stroke: am5.color(0xe2e8f0),
        strokeWidth: 0.8,
        interactive: true
      })

      worldSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0xdbeafe),
        strokeWidth: 1.2
      })

      const offices: MapOffice[] = [
        { title: "🇮🇳 INDIA HQ - Jaipur", name: "India", lat: 26.9124, lng: 75.7873, size: 12 },
        { title: "🇦🇪 UAE Office - Dubai", name: "UAE", lat: 25.2048, lng: 55.2708, size: 10 }
      ]

      const serviceLocations: MapLocation[] = [
        { lat: 23.8103, lng: 90.4125, name: '🇧🇩 Bangladesh' },
        { lat: 7.8731, lng: 80.7718, name: '🇱🇰 Sri Lanka' },
        { lat: 28.3949, lng: 84.1240, name: '🇳🇵 Nepal' },
        { lat: 1.3521, lng: 103.8198, name: '🇸🇬 Singapore' },
        { lat: 3.1390, lng: 101.6869, name: '🇲🇾 Malaysia' },
        { lat: 13.7563, lng: 100.5018, name: '🇹🇭 Thailand' },
        { lat: -35.2809, lng: 149.1300, name: '🇦🇺 Australia' },
        { lat: 24.7136, lng: 46.6753, name: '🇸🇦 Saudi Arabia' },
        { lat: 25.3548, lng: 51.1839, name: '🇶🇦 Qatar' },
        { lat: 26.8206, lng: 30.8025, name: '🇪🇬 Egypt' },
        { lat: 51.5074, lng: -0.1278, name: '🇬🇧 United Kingdom' },
        { lat: 37.0902, lng: -95.7129, name: '🇺🇸 USA' }
      ]

      const servedCountries = ['IN', 'AE', 'SA', 'QA', 'AU', 'SG', 'MY', 'TH', 
                               'BD', 'LK', 'NP', 'EG', 'GB', 'US']
      
      worldSeries.events.on("datavalidated", () => {
        worldSeries.mapPolygons.each((polygon: any) => {
          const dataContext = polygon.dataItem?.dataContext as any
          if (dataContext && servedCountries.includes(dataContext.id)) {
            polygon.set("fill", am5.color(0xbfdbfe))
            polygon.states.create("hover", {
              fill: am5.color(0x93c5fd)
            })
          }
        })
      })

      const officeSeries = worldChart.series.push(
        am5map.MapPointSeries.new(worldRoot, {})
      )

      officeSeries.bullets.push(() => {
        const container = am5.Container.new(worldRoot, {})

        // Subtle pulse animation
        const pulse = container.children.push(
          am5.Circle.new(worldRoot, {
            radius: 15,
            fill: am5.color(0xef4444),
            fillOpacity: 0.2,
          })
        )

        pulse.animate({
          key: "scale",
          from: 0.8,
          to: 1.5,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        })

        pulse.animate({
          key: "opacity",
          from: 0.4,
          to: 0,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        })

        return am5.Bullet.new(worldRoot, { sprite: container })
      })

      offices.forEach(office => {
        officeSeries.data.push({
          geometry: { type: "Point", coordinates: [office.lng, office.lat] },
          title: office.title
        })
      })

      const lineSeries = worldChart.series.push(am5map.MapLineSeries.new(worldRoot, {}))
      lineSeries.mapLines.template.setAll({
        stroke: am5.color(0x3b82f6),
        strokeOpacity: 0.3,
        strokeWidth: 1
      })

      const indiaHQ = offices[0]
      serviceLocations.forEach((loc) => {
        lineSeries.data.push({
          geometry: {
            type: "LineString",
            coordinates: [
              [indiaHQ.lng, indiaHQ.lat],
              [loc.lng, loc.lat]
            ]
          }
        })
      })

      const serviceSeries = worldChart.series.push(
        am5map.MapPointSeries.new(worldRoot, {})
      )

      serviceSeries.bullets.push(() => {
        const circle = am5.Circle.new(worldRoot, {
          radius: 4,
          fill: am5.color(0x3b82f6),
          stroke: am5.color(0xffffff),
          strokeWidth: 1.5,
          tooltipText: "{name}",
          fillOpacity: 0.8
        })

        circle.states.create("hover", {
          scale: 1.5,
          fillOpacity: 1
        })

        return am5.Bullet.new(worldRoot, { sprite: circle })
      })

      serviceLocations.forEach((loc) => {
        serviceSeries.data.push({
          geometry: { type: "Point", coordinates: [loc.lng, loc.lat] },
          name: loc.name
        })
      })

      worldChart.appear(1000, 100)
    }

    initMaps()

    return () => {
      if (worldRoot) worldRoot.dispose()
    }
  }, [isInView])

  const offices: Office[] = [
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

  const countries = [
    'India', 'UAE', 'Saudi Arabia', 'Qatar', 'Australia', 'Singapore',
    'Malaysia', 'Thailand', 'Bangladesh', 'Sri Lanka', 'Nepal',
    'Egypt', 'United Kingdom', 'USA'
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From our headquarters in India to offices across the globe,
            we serve customers in over 25 countries worldwide.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {offices.map((office, index) => (
            <motion.div
              key={office.location}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{office.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{office.location}</h3>
              <p className="text-blue-700 font-semibold mb-2">{office.address}</p>
              <p className="text-gray-700">{office.details}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 mb-12 shadow-lg"
        >
          <div
            ref={worldChartRef}
            style={{ width: '100%', height: '500px' }}
            className="rounded-lg overflow-hidden border border-gray-200"
          />
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">Headquarters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-700">Service Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-blue-400 opacity-50"></div>
              <span className="text-gray-700">Distribution Network</span>
            </div>
          </div>
        </motion.div>

        {/* Countries Served */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Countries We Serve</h3>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {countries.map((country) => (
              <motion.span
                key={country}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm cursor-pointer"
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