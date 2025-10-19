import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

export function MapControls({ 
  onZoomIn, 
  onZoomOut, 
  onReset,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight
}: MapControlsProps) {
  const buttonClass = "w-10 h-10 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95";
  
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
      {/* Zoom Controls */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onZoomIn}
          className={buttonClass}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button
          onClick={onZoomOut}
          className={buttonClass}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      {/* Directional Controls */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-1">
        <div className="grid grid-cols-3 gap-1">
          {/* Top row */}
          <div></div>
          <button
            onClick={onMoveUp}
            className="w-9 h-9 rounded hover:bg-blue-50 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Move up"
            title="Move up"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <div></div>
          
          {/* Middle row */}
          <button
            onClick={onMoveLeft}
            className="w-9 h-9 rounded hover:bg-blue-50 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Move left"
            title="Move left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <button
            onClick={onMoveRight}
            className="w-9 h-9 rounded hover:bg-blue-50 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Move right"
            title="Move right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Bottom row */}
          <div></div>
          <button
            onClick={onMoveDown}
            className="w-9 h-9 rounded hover:bg-blue-50 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Move down"
            title="Move down"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <div></div>
        </div>
      </div>

      {/* Reset Control */}
      <button
        onClick={onReset}
        className={buttonClass}
        aria-label="Reset view"
        title="Reset view"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}