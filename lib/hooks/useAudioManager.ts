import { useEffect, useRef, useState, useCallback } from 'react'

interface UseAudioManagerOptions {
  src: string
  volume?: number
  loop?: boolean
}

export function useAudioManager({
  src,
  volume = 0.3,
  loop = true,
}: UseAudioManagerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audioMuted')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = Math.max(0, Math.min(1, volume))
    audio.muted = isMuted
    audioRef.current = audio

    const onPlay = () => {
      setIsPlaying(true)
      try { localStorage.setItem('audioPlaying', 'true') } catch {}
    }
    const onPause = () => {
      setIsPlaying(false)
      try { localStorage.setItem('audioPlaying', 'false') } catch {}
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    try {
      const savedPlaying = localStorage.getItem('audioPlaying')
      if (savedPlaying === 'true' && !audio.muted) {
        audio.play().catch((err) => {
          if (!(err instanceof DOMException && err.name === 'NotAllowedError')) {
            console.error('Audio play error while restoring state:', err)
          }
        })
      }
    } catch {
    }

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
  }, [src, loop])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
    try { localStorage.setItem('audioMuted', JSON.stringify(isMuted)) } catch {}
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }, [volume])

  const pause = useCallback((): void => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setIsPlaying(false)
      try { localStorage.setItem('audioPlaying', 'false') } catch {}
    }
  }, [])

  const play = useCallback(async (): Promise<void> => {
    const audio = audioRef.current
    if (audio) {
      try {
        await audio.play()
        setIsPlaying(true)
        try { localStorage.setItem('audioPlaying', 'true') } catch {}
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
          console.error('Unexpected play() error:', error)
        }
      }
    }
  }, [])

  const toggleMute = useCallback(async (): Promise<void> => {
    const audio = audioRef.current
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    if (audio) {
      audio.muted = newMutedState
    }

    if (!newMutedState && audio && !isPlaying) {
      try {
        await audio.play()
        setIsPlaying(true)
        try { localStorage.setItem('audioPlaying', 'true') } catch {}
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
          console.error('Error playing after unmute:', error)
        }
      }
    }

    try { localStorage.setItem('audioMuted', JSON.stringify(newMutedState)) } catch {}
  }, [isMuted, isPlaying])

  const setVolume = (vol: number): void => {
    const audio = audioRef.current
    const clamped = Math.max(0, Math.min(1, vol))
    if (audio) {
      audio.volume = clamped
    }
  }

  return {
    pause,
    play,
    toggleMute,
    setVolume,
    isPlaying,
    isMuted,
    audioRef,
  }
}
