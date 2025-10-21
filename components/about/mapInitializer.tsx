import { MAP_OFFICES, SERVICE_LOCATIONS, SERVED_COUNTRIES } from '@/data/globalPresenceData'
import type * as am5 from '@amcharts/amcharts5'
import type * as am5map from '@amcharts/amcharts5/map'
import type { FeatureCollection } from 'geojson'

type CountryDataContext = {
  id: string
  name?: string
}

type ServiceLocation = {
  name: string
  lat: number
  lng: number
}

type Office = {
  title: string
  lat: number
  lng: number
}

export type MapControlHandlers = {
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
  moveUp: () => void
  moveDown: () => void
  moveLeft: () => void
  moveRight: () => void
  getZoomLevel?: () => number
}

// -------------------- Utils --------------------
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function getNearestOffice(service: ServiceLocation, offices: Office[]): Office {
  let nearest = offices[0]
  let minDistance = getDistance(service.lat, service.lng, nearest.lat, nearest.lng)

  for (let i = 1; i < offices.length; i++) {
    const distance = getDistance(service.lat, service.lng, offices[i].lat, offices[i].lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = offices[i]
    }
  }

  return nearest
}

// -------------------- Map Initialization --------------------
export async function initializeMap(mapRef: HTMLDivElement | null) {
  if (!mapRef) return null

  try {
    const [am5Module, am5mapModule, am5geodataModule, am5themes] = await Promise.all([
      import('@amcharts/amcharts5'),
      import('@amcharts/amcharts5/map'),
      import('@amcharts/amcharts5-geodata/worldIndiaLow'),
      import('@amcharts/amcharts5/themes/Animated')
    ])

    const root = am5Module.Root.new(mapRef)
    root.setThemes([am5themes.default.new(root)])

    const chart = createMapChart(root, am5Module, am5mapModule)
    const polygonSeries = createPolygonSeries(root, chart, am5Module, am5mapModule, am5geodataModule)

    const lineSeries = createLineSeries(root, chart, am5Module, am5mapModule)
    createServiceSeries(root, chart, am5Module, am5mapModule)
    createOfficeSeries(root, chart, am5Module, am5mapModule)

    if (MAP_OFFICES && MAP_OFFICES.length >= 2) {
      const a = MAP_OFFICES[0]
      const b = MAP_OFFICES[1]
      lineSeries.data.push({
        geometry: {
          type: 'LineString',
          coordinates: [
            [a.lng, a.lat],
            [b.lng, b.lat]
          ]
        }
      })
    }

    chart.appear(1000, 100)

    polygonSeries.events.once('datavalidated', () => {
      chart.zoomToGeoPoint({ longitude: 78.9629, latitude: 22.5937 }, 3.2, true)
    })

    // Track current position properly
    type GeoPoint = { longitude: number; latitude: number }
    let currentCenter: GeoPoint = { longitude: 78.9629, latitude: 22.5937 }

    // Update center whenever map moves
    const updateCenter = () => {
      const centerPoint = chart.get('centerMapOnZoomOut') !== false
        ? chart.get('centerGeoPoint' as keyof am5map.IMapChartSettings)
        : chart.get('geoPoint' as keyof am5map.IMapChartSettings)

      if (centerPoint && typeof centerPoint.longitude === 'number' && typeof centerPoint.latitude === 'number') {
        currentCenter = {
          longitude: centerPoint.longitude,
          latitude: centerPoint.latitude
        }
      }
    }

    chart.events.on('zoomended' as keyof am5map.IMapChartEvents, updateCenter)
    chart.events.on('panended' as keyof am5map.IMapChartEvents, updateCenter)

    const seriesContainer = chart.seriesContainer

    if (seriesContainer?.events) {
      seriesContainer.events.on('positionchanged', updateCenter)
    }

    const controls: MapControlHandlers = {
      zoomIn: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        chart.zoomToGeoPoint(currentCenter, currentZoom * 1.5, true)
      },
      zoomOut: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        chart.zoomToGeoPoint(currentCenter, currentZoom / 1.5, true)
      },
      reset: () => {
        currentCenter = { longitude: 78.9629, latitude: 22.5937 }
        chart.goHome()
      },
      moveUp: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        const delta = Math.max(2, 8 / Math.sqrt(currentZoom))
        currentCenter = {
          longitude: currentCenter.longitude,
          latitude: currentCenter.latitude + delta
        }
        chart.zoomToGeoPoint(currentCenter, currentZoom, true)
      },
      moveDown: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        const delta = Math.max(2, 8 / Math.sqrt(currentZoom))
        currentCenter = {
          longitude: currentCenter.longitude,
          latitude: currentCenter.latitude - delta
        }
        chart.zoomToGeoPoint(currentCenter, currentZoom, true)
      },
      moveLeft: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        const delta = Math.max(2, 8 / Math.sqrt(currentZoom))
        currentCenter = {
          longitude: currentCenter.longitude - delta,
          latitude: currentCenter.latitude
        }
        chart.zoomToGeoPoint(currentCenter, currentZoom, true)
      },
      moveRight: () => {
        updateCenter()
        const currentZoom = (chart.get('zoomLevel') as number) ?? 1
        const delta = Math.max(2, 8 / Math.sqrt(currentZoom))
        currentCenter = {
          longitude: currentCenter.longitude + delta,
          latitude: currentCenter.latitude
        }
        chart.zoomToGeoPoint(currentCenter, currentZoom, true)
      },
      getZoomLevel: () => (chart.get('zoomLevel') as number) ?? 1
    }

    return { root, controls }
  } catch (error) {
    console.error('Failed to initialize map:', error)
    return null
  }
}

// -------------------- Map Chart --------------------
function createMapChart(
  root: am5.Root,
  am5: typeof import('@amcharts/amcharts5'),
  am5map: typeof import('@amcharts/amcharts5/map')
): am5map.MapChart {
  return root.container.children.push(
    am5map.MapChart.new(root, {
      panX: 'translateX',
      panY: 'translateY',
      projection: am5map.geoMercator(),
      homeGeoPoint: { longitude: 78.9629, latitude: 22.5937 },
      homeZoomLevel: 3.2,
      maxZoomLevel: 8,
      minZoomLevel: 1.5,
      wheelY: 'zoom',
      pinchZoom: true,
      centerMapOnZoomOut: false
    })
  )
}

// -------------------- Polygon Series --------------------
function createPolygonSeries(
  root: am5.Root,
  chart: am5map.MapChart,
  am5: typeof import('@amcharts/amcharts5'),
  am5map: typeof import('@amcharts/amcharts5/map'),
  am5geodata: { default: FeatureCollection }
) {
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata.default
    })
  )

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    fill: am5.color(0xF5F7FA),
    stroke: am5.color(0xB3E5FC),
    strokeWidth: 0.8,
    interactive: true,
    fillOpacity: 1,
    tooltipY: 0
  })

  polygonSeries.mapPolygons.template.states.create('hover', {
    fill: am5.color(0xE6F7FF),
    strokeWidth: 1.8,
    stroke: am5.color(0x80D4F8)
  })

  polygonSeries.events.on('datavalidated', () => {
    polygonSeries.mapPolygons.each((polygon) => {
      const data = polygon.dataItem?.dataContext as CountryDataContext | undefined
      if (data && SERVED_COUNTRIES.includes(data.id)) {
        polygon.setAll({
          fill: am5.color(0xB3E5FC),
          fillOpacity: 0.7
        })
      }
    })
  })

  return polygonSeries
}

// -------------------- Line Series --------------------
function createLineSeries(
  root: am5.Root,
  chart: am5map.MapChart,
  am5: typeof import('@amcharts/amcharts5'),
  am5map: typeof import('@amcharts/amcharts5/map')
) {
  const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))

  lineSeries.mapLines.template.setAll({
    stroke: am5.color(0x00A0E3),
    strokeOpacity: 0.45,
    strokeWidth: 1.5,
    cursorOverStyle: 'pointer'
  })

  lineSeries.mapLines.template.states.create('hover', {
    strokeOpacity: 0.9,
    strokeWidth: 2.5
  })

  SERVICE_LOCATIONS.forEach((service) => {
    const nearestOffice = getNearestOffice(service, MAP_OFFICES)

    lineSeries.data.push({
      geometry: {
        type: 'LineString',
        coordinates: [
          [nearestOffice.lng, nearestOffice.lat],
          [service.lng, service.lat]
        ]
      }
    })
  })

  return lineSeries
}

// -------------------- Service Series --------------------
function createServiceSeries(
  root: am5.Root,
  chart: am5map.MapChart,
  am5: typeof import('@amcharts/amcharts5'),
  am5map: typeof import('@amcharts/amcharts5/map')
) {
  const serviceSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {})
  )

  serviceSeries.bullets.push((root) => {
    const container = am5.Container.new(root, {
      interactive: true,
      tooltipText: '{name}',
      cursorOverStyle: 'pointer',
      focusable: true
    })

    container.set('tooltip', am5.Tooltip.new(root, {}))

    const circle = container.children.push(
      am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0x00A0E3),
        stroke: am5.color(0xFFFFFF),
        strokeWidth: 2
      })
    )

    container.events.on('pointerover', () => {
      circle.hover()
    })

    container.events.on('pointerout', () => {
      circle.unhover()
    })

    return am5.Bullet.new(root, { sprite: container })
  })

  SERVICE_LOCATIONS.forEach((loc) => {
    serviceSeries.data.push({
      geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
      name: loc.name
    })
  })
}

// -------------------- Office Series --------------------
function createOfficeSeries(
  root: am5.Root,
  chart: am5map.MapChart,
  am5: typeof import('@amcharts/amcharts5'),
  am5map: typeof import('@amcharts/amcharts5/map')
) {
  const officeSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {})
  )

  officeSeries.bullets.push((root) => {
    const container = am5.Container.new(root, {
      interactive: true,
      tooltipText: '{title}',
      cursorOverStyle: 'pointer',
      focusable: true
    })

    container.set('tooltip', am5.Tooltip.new(root, {}))

    // Pulsing effect
    const pulse = container.children.push(
      am5.Circle.new(root, {
        radius: 18,
        fill: am5.color(0xef4444),
        fillOpacity: 0.25,
        interactive: false
      })
    )
    pulse.animate({
      key: 'scale',
      from: 0.8,
      to: 2,
      duration: 2000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    })
    pulse.animate({
      key: 'opacity',
      from: 0.5,
      to: 0,
      duration: 2000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    })

    const circle = container.children.push(
      am5.Circle.new(root, {
        radius: 7,
        fill: am5.color(0xef4444),
        stroke: am5.color(0xFFFFFF),
        strokeWidth: 2.5
      })
    )

    container.events.on('pointerover', () => {
      circle.hover()
    })

    container.events.on('pointerout', () => {
      circle.unhover()
    })

    return am5.Bullet.new(root, { sprite: container })
  })

  MAP_OFFICES.forEach((office) => {
    officeSeries.data.push({
      geometry: { type: 'Point', coordinates: [office.lng, office.lat] },
      title: office.title
    })
  })
}