'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function GlobalPresence() {
  const ref = useRef(null)
  const worldChartRef = useRef<HTMLDivElement>(null)
  const indiaChartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView || !worldChartRef.current || !indiaChartRef.current) return

    let worldRoot: any
    let indiaRoot: any

    const initMaps = async () => {
      const am5 = await import('@amcharts/amcharts5')
      const am5map = await import('@amcharts/amcharts5/map')
      const am5geodata_worldLow = await import('@amcharts/amcharts5-geodata/worldLow')
      const am5geodata_indiaLow = await import('@amcharts/amcharts5-geodata/indiaLow')
      const am5themes_Animated = await import('@amcharts/amcharts5/themes/Animated')

      // ========== WORLD MAP ==========
      worldRoot = am5.Root.new(worldChartRef.current!)
      worldRoot.setThemes([am5themes_Animated.default.new(worldRoot)])

      const worldChart = worldRoot.container.children.push(
        am5map.MapChart.new(worldRoot, {
          panX: "rotateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
          homeGeoPoint: { longitude: 55, latitude: 20 },
          homeZoomLevel: 1.5
        })
      )

      const worldSeries = worldChart.series.push(
        am5map.MapPolygonSeries.new(worldRoot, {
          geoJSON: am5geodata_worldLow.default
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

      const offices = [
        {
          title: "🇮🇳 India HQ - Jaipur",
          lat: 26.9124,
          lng: 75.7873,
          size: 12
        },
        {
          title: "🇦🇪 UAE Office - Dubai",
          lat: 25.2048,
          lng: 55.2708,
          size: 10
        }
      ]

      const serviceLocations = [
        { lat: 23.8103, lng: 90.4125, name: '🇧🇩 Bangladesh' },
        { lat: 7.8731, lng: 80.7718, name: '🇱🇰 Sri Lanka' },
        { lat: 28.3949, lng: 84.1240, name: '🇳🇵 Nepal' },
        { lat: 21.9162, lng: 95.9560, name: '🇲🇲 Myanmar' },
        { lat: 10.8231, lng: 106.6297, name: '🇻🇳 Vietnam' },
        { lat: 1.3521, lng: 103.8198, name: '🇸🇬 Singapore' },
        { lat: 3.1390, lng: 101.6869, name: '🇲🇾 Malaysia' },
        { lat: 13.7563, lng: 100.5018, name: '🇹🇭 Thailand' },
        { lat: 14.5995, lng: 120.9842, name: '🇵🇭 Philippines' },
        { lat: -6.2088, lng: 106.8456, name: '🇮🇩 Indonesia' },
        { lat: -35.2809, lng: 149.1300, name: '🇦🇺 Australia' },
        { lat: 24.7136, lng: 46.6753, name: '🇸🇦 Saudi Arabia' },
        { lat: 25.3548, lng: 51.1839, name: '🇶🇦 Qatar' },
        { lat: 23.5880, lng: 58.3829, name: '🇴🇲 Oman' },
        { lat: 26.8206, lng: 30.8025, name: '🇪🇬 Egypt' },
        { lat: 31.9454, lng: 35.9284, name: '🇯🇴 Jordan' },
        { lat: 33.8886, lng: 35.4955, name: '🇱🇧 Lebanon' },
        { lat: 39.9334, lng: 32.8597, name: '🇹🇷 Turkey' },
        { lat: -1.2921, lng: 36.8219, name: '🇰🇪 Kenya' },
        { lat: -6.7924, lng: 39.2083, name: '🇹🇿 Tanzania' },
        { lat: -26.2041, lng: 28.0473, name: '🇿🇦 South Africa' },
        { lat: 9.0820, lng: 8.6753, name: '🇳🇬 Nigeria' },
        { lat: 5.6037, lng: -0.1870, name: '🇬🇭 Ghana' }
      ]

      // Office markers
      const officeSeries = worldChart.series.push(
        am5map.MapPointSeries.new(worldRoot, {})
      )

      officeSeries.bullets.push(() => {
        const container = am5.Container.new(worldRoot, {})

        const circle = container.children.push(
          am5.Circle.new(worldRoot, {
            radius: 10,
            fill: am5.color(0xef4444),
            stroke: am5.color(0xffffff),
            strokeWidth: 3,
            tooltipText: "{title}",
            shadowColor: am5.color(0x000000),
            shadowBlur: 8,
            shadowOpacity: 0.3
          })
        )

        circle.animate({
          key: "scale",
          from: 1,
          to: 1.2,
          duration: 1200,
          easing: am5.ease.inOut(am5.ease.cubic),
          loops: Infinity
        })

        const outerRing = container.children.push(
          am5.Circle.new(worldRoot, {
            radius: 20,
            fill: am5.color(0xef4444),
            fillOpacity: 0.15,
          })
        )

        outerRing.animate({
          key: "scale",
          from: 0.8,
          to: 1.6,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        })

        outerRing.animate({
          key: "opacity",
          from: 0.5,
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

      // Connection lines
      const lineSeries = worldChart.series.push(am5map.MapLineSeries.new(worldRoot, {}))
      lineSeries.mapLines.template.setAll({
        stroke: am5.color(0x3b82f6),
        strokeOpacity: 0.5,
        strokeWidth: 2
      })

      const indiaHQ = offices[0]
      serviceLocations.forEach((loc, index) => {
        setTimeout(() => {
          lineSeries.data.push({
            geometry: {
              type: "LineString",
              coordinates: [
                [indiaHQ.lng, indiaHQ.lat],
                [loc.lng, loc.lat]
              ]
            }
          })
        }, index * 60)
      })

      // Service location markers
      const serviceSeries = worldChart.series.push(
        am5map.MapPointSeries.new(worldRoot, {})
      )

      serviceSeries.bullets.push(() => {
        const circle = am5.Circle.new(worldRoot, {
          radius: 5,
          fill: am5.color(0x3b82f6),
          stroke: am5.color(0xffffff),
          strokeWidth: 2.5,
          fillOpacity: 0.9,
          tooltipText: "{name}",
          shadowColor: am5.color(0x000000),
          shadowBlur: 4,
          shadowOpacity: 0.2
        })

        circle.states.create("hover", {
          scale: 1.5,
          fillOpacity: 1
        })

        return am5.Bullet.new(worldRoot, { sprite: circle })
      })

      serviceLocations.forEach(loc => {
        serviceSeries.data.push({
          geometry: { type: "Point", coordinates: [loc.lng, loc.lat] },
          name: loc.name
        })
      })

      worldChart.appear(1000, 100)

      // ========== INDIA MAP ==========
      indiaRoot = am5.Root.new(indiaChartRef.current!)
      indiaRoot.setThemes([am5themes_Animated.default.new(indiaRoot)])

      const indiaChart = indiaRoot.container.children.push(
        am5map.MapChart.new(indiaRoot, {
          panX: "translateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
          homeZoomLevel: 4
        })
      )

      const indiaSeries = indiaChart.series.push(
        am5map.MapPolygonSeries.new(indiaRoot, {
          geoJSON: am5geodata_indiaLow.default
        })
      )

      indiaSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        fill: am5.color(0xdbeafe),
        stroke: am5.color(0x3b82f6),
        strokeWidth: 1,
        interactive: true
      })

      indiaSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x93c5fd),
        strokeWidth: 1.5
      })

      // India HQ marker
      const indiaOfficeSeries = indiaChart.series.push(
        am5map.MapPointSeries.new(indiaRoot, {})
      )

      indiaOfficeSeries.bullets.push(() => {
        const container = am5.Container.new(indiaRoot, {})

        const pin = container.children.push(
          am5.Graphics.new(indiaRoot, {
            fill: am5.color(0xef4444),
            stroke: am5.color(0xffffff),
            strokeWidth: 3,
            svgPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            centerX: am5.p50,
            centerY: am5.p100,
            scale: 2,
            tooltipText: "🇮🇳 India HQ - Jaipur, Rajasthan\nMain Manufacturing & R&D Facility",
            shadowColor: am5.color(0x000000),
            shadowBlur: 8,
            shadowOpacity: 0.4
          })
        )

        pin.animate({
          key: "y",
          from: -10,
          to: 0,
          duration: 1500,
          easing: am5.ease.out(am5.ease.elastic),
          loops: Infinity
        })

        const pulse = container.children.push(
          am5.Circle.new(indiaRoot, {
            radius: 30,
            fill: am5.color(0xef4444),
            fillOpacity: 0.2,
            centerX: am5.p50,
            centerY: am5.p100
          })
        )

        pulse.animate({
          key: "scale",
          from: 0.5,
          to: 2,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        })

        pulse.animate({
          key: "opacity",
          from: 0.6,
          to: 0,
          duration: 2000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        })

        return am5.Bullet.new(indiaRoot, { sprite: container })
      })

      indiaOfficeSeries.data.push({
        geometry: { type: "Point", coordinates: [75.7873, 26.9124] }
      })

      indiaChart.appear(1200, 100)
    }

    initMaps()

    return () => {
      if (worldRoot) worldRoot.dispose()
      if (indiaRoot) indiaRoot.dispose()
    }
  }, [isInView])

  const offices = [
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
    'India', 'UAE', 'Saudi Arabia', 'Qatar', 'Australia', 'Oman',
    'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines',
    'Indonesia', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Myanmar',
    'Egypt', 'Jordan', 'Lebanon', 'Turkey', 'Kenya', 'Tanzania',
    'South Africa', 'Nigeria', 'Ghana'
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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

        {/* Office Locations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {offices.map((office, index) => (
            <motion.div
              key={office.location}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-6xl mb-4">{office.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{office.location}</h3>
              <p className="text-primary-700 font-semibold mb-2">{office.address}</p>
              <p className="text-gray-700">{office.details}</p>
            </motion.div>
          ))}
        </div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 mb-12 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Global Network
          </h3>
          <div
            ref={worldChartRef}
            style={{ width: '100%', height: '550px' }}
            className="rounded-xl overflow-hidden"
          />
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-md"></div>
              <span className="text-gray-700 font-medium">Headquarters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 shadow-md"></div>
              <span className="text-gray-700 font-medium">Service Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-blue-500"></div>
              <span className="text-gray-700 font-medium">Distribution Network</span>
            </div>
          </div>
        </motion.div>

        {/* India Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-16 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            India Operations Center
          </h3>
          <div
            ref={indiaChartRef}
            style={{ width: '100%', height: '500px' }}
            className="rounded-xl overflow-hidden"
          />
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-medium">
              📍 Jaipur, Rajasthan - The Pink City
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Strategic location connecting North and Western India
            </p>
          </div>
        </motion.div>

        {/* Countries Served */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Countries We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, index) => (
              <motion.span
                key={country}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.02 }}
                className="bg-white text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-100 hover:text-primary-700 hover:shadow-md transition-all cursor-pointer shadow-sm"
              >
                {country}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}