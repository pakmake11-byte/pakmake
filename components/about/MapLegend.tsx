import React from 'react'

interface LegendItemProps {
  color: string
  label: string
  type?: 'circle' | 'line'
  size?: 'small' | 'medium' | 'large'
}

const LegendItem = React.memo(function LegendItem({ 
  color, 
  label, 
  type = 'circle', 
  size = 'medium' 
}: LegendItemProps) {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  }

  if (type === 'line') {
    return (
      <div className="flex items-center gap-3">
        <div className={`w-10 h-0.5 ${color} opacity-70`}></div>
        <span className="text-[#334155] font-semibold text-sm">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-full ${color} shadow-sm`} />
      <span className="text-[#334155] font-semibold text-sm">{label}</span>
    </div>
  )
})

interface MapLegendProps {
  items?: Array<{ color: string; label: string; type?: 'circle' | 'line'; size?: 'small' | 'medium' | 'large' }>
}

export const MapLegend = React.memo(function MapLegend({ items }: MapLegendProps) {
  const defaultItems = items || [
    { color: 'bg-[#ef4444]', label: 'Office', type: 'circle' as const, size: 'large' as const },
    { color: 'bg-[#00A0E3]', label: 'Service Locations', type: 'circle' as const, size: 'medium' as const },
    { color: 'bg-[#00A0E3]', label: 'Distribution Network', type: 'line' as const },
    { color: 'bg-[#B3E5FC]', label: 'Countries Served', type: 'circle' as const, size: 'small' as const }
  ]

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {defaultItems.map((item, index) => (
          <LegendItem key={`${item.label}-${index}`} {...item} />
        ))}
      </div>
    </div>
  )
})