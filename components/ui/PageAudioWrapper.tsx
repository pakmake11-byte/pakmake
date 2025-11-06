'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAudioManager } from '@/lib/hooks/useAudioManager'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

const PAGE_AUDIO_MAP: Record<string, string> = {
  '/': '/music/home.wav',
  '/about': '/music/about.wav',
  '/contact': '/music/contact.wav',
}

export function PageAudioWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const audioSrc = PAGE_AUDIO_MAP[pathname] || '/music/home.wav'

  const { pause, play, toggleMute, setVolume, isPlaying, isMuted } = useAudioManager({
    src: audioSrc,
    volume: 0.3,
    loop: true,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__pageAudioControl = {
        pause,
        play,
        toggleMute,
        setVolume,
        isPlaying,
        isMuted
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.__pageAudioControl
      }
    }
  }, [pause, play, toggleMute, setVolume, isPlaying, isMuted])

  return (
    <>
      {children}

      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-[#00A0E3] to-[#007CB8] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </motion.button>
    </>
  )
}

declare global {
  interface Window {
    __pageAudioControl?: {
      pause: () => void
      play: () => Promise<void>
      toggleMute: () => Promise<void>
      setVolume: (vol: number) => void
      isPlaying: boolean
      isMuted: boolean
    }
  }
}