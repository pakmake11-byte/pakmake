'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAudioManager } from '@/lib/hooks/useAudioManager'
import { Volume2, VolumeX } from 'lucide-react'

const PAGE_AUDIO_MAP: Record<string, string> = {
  '/': '/music/home.wav',
  '/about': '/music/about.wav',
  '/contact': '/music/contact.wav',
}

export function PageAudioWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const audioSrc = PAGE_AUDIO_MAP[pathname] || '/music/home.wav'
  
  const { pause, play, toggleMute, isPlaying, isMuted } = useAudioManager({
    src: audioSrc,
    volume: 0.3,
    loop: true,
    autoPlay: true
  })

  // Expose audio control globally for TechnicalDeepDive
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__pageAudioControl = {
        pause,
        play,
        isPlaying
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.__pageAudioControl
      }
    }
  }, [pause, play, isPlaying])

  return (
    <>
      {children}
      
      {/* Audio Control Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#00A0E3] to-[#007CB8] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </>
  )
}

// Type declaration for global audio control
declare global {
  interface Window {
    __pageAudioControl?: {
      pause: () => void
      play: () => void
      isPlaying: boolean
    }
  }
}