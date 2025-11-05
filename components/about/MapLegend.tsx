import React from 'react'

interface LegendItemProps {
  color: string
  label: string
}

const LegendItem = React.memo(function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full ${color} shadow-sm`} />
      <span className="text-[#334155] font-semibold text-sm">{label}</span>
    </div>
  )
})

interface MapLegendItem {
  color: string
  label: string
}

interface MapLegendProps {
  items?: MapLegendItem[]
}

export const MapLegend = React.memo(function MapLegend({ items }: MapLegendProps) {
  const defaultItems: MapLegendItem[] = [
    { color: 'bg-[#ef4444]', label: 'Office' },
    { color: 'bg-[#00A0E3]', label: 'Service Locations' },
  ]

  const legendItems = items ?? defaultItems

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {legendItems.map((item) => (
          <LegendItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
})
