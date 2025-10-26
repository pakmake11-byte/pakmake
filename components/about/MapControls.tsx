import React, { useRef, useEffect, useCallback } from 'react'
import { ZoomIn, ZoomOut, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onMoveLeft: () => void
  onMoveRight: () => void
}

export const MapControls = React.memo(function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight
}: MapControlsProps) {
  const repeatRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const startRepeat = useCallback((fn: () => void) => {
    fn()
    if (repeatRef.current !== null) {
      window.clearInterval(repeatRef.current)
    }
    repeatRef.current = window.setInterval(fn, 120)
  }, [])

  const stopRepeat = useCallback(() => {
    if (repeatRef.current !== null) {
      window.clearInterval(repeatRef.current)
      repeatRef.current = null
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); onMoveUp() }
      if (e.key === 'ArrowDown') { e.preventDefault(); onMoveDown() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onMoveLeft() }
      if (e.key === 'ArrowRight') { e.preventDefault(); onMoveRight() }
      if (e.key === '+' || e.key === '=') onZoomIn()
      if (e.key === '-') onZoomOut()
      if (e.key === '0') onReset()
    }

    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('keydown', onKey)
      stopRepeat()
    }
  }, [onMoveUp, onMoveDown, onMoveLeft, onMoveRight, onZoomIn, onZoomOut, onReset, stopRepeat])

  const buttonClass = `
    w-10 h-10 flex items-center justify-center rounded-lg
    bg-white/90 backdrop-blur-sm border border-gray-300/50
    shadow hover:shadow-lg hover:bg-blue-50
    text-gray-600 hover:text-blue-600 transition
    active:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-400/50
  `

  return (
    <div
      ref={containerRef}
      className="absolute top-10 right-10 z-10 flex flex-col gap-4 p-2"
      tabIndex={0}
      role="group"
      aria-label="Map controls. Use arrow keys when focused for panning."
      onBlur={stopRepeat}
      onMouseLeave={stopRepeat}
    >
      {/* Directional Pad */}
      <div className="grid grid-cols-3 gap-1 bg-white/90 backdrop-blur-sm p-2 rounded-2xl border border-gray-300/50 shadow">
        <div></div>
        <button
          onClick={onMoveUp}
          onMouseDown={() => startRepeat(onMoveUp)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Move up"
          aria-label="Move up"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <div></div>

        <button
          onClick={onMoveLeft}
          onMouseDown={() => startRepeat(onMoveLeft)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Move left"
          aria-label="Move left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div></div>
        <button
          onClick={onMoveRight}
          onMouseDown={() => startRepeat(onMoveRight)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Move right"
          aria-label="Move right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div></div>
        <button
          onClick={onMoveDown}
          onMouseDown={() => startRepeat(onMoveDown)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Move down"
          aria-label="Move down"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <div></div>
      </div>

      {/* Zoom + Reset Controls */}
      <div className="flex flex-row gap-2">
        <button
          onClick={onZoomIn}
          onMouseDown={() => startRepeat(onZoomIn)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={onZoomOut}
          onMouseDown={() => startRepeat(onZoomOut)}
          onMouseUp={stopRepeat}
          className={buttonClass}
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={onReset}
          className={`${buttonClass}`}
          title="Reset view"
          aria-label="Reset view"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
})