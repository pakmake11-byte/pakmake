import { useEffect, useRef, useState } from 'react'

interface UseAudioManagerOptions {
  src: string
  volume?: number
  loop?: boolean
  autoPlay?: boolean
}

export function useAudioManager({
  src,
  volume = 0.3,
  loop = true,
  autoPlay = true
}: UseAudioManagerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.loop = loop
    audioRef.current = audio

    const playAudio = async (): Promise<void> => {
      if (autoPlay && audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          if (error instanceof DOMException && error.name === 'NotAllowedError') {
            // Suppress autoplay restriction errors
            return
          }
          console.error('Unexpected audio error:', error)
        }
      }
    }

    const enableAudio = async (): Promise<void> => {
      await playAudio()
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('keydown', enableAudio)
      document.removeEventListener('scroll', enableAudio)
    }

    document.addEventListener('click', enableAudio, { once: true })
    document.addEventListener('keydown', enableAudio, { once: true })
    document.addEventListener('scroll', enableAudio, { once: true })

    // Attempt autoplay once
    void playAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('keydown', enableAudio)
      document.removeEventListener('scroll', enableAudio)
    }
  }, [src, volume, loop, autoPlay])

  const pause = (): void => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const play = (): void => {
    const audio = audioRef.current
    if (audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
            console.error('Unexpected play() error:', error)
          }
        })
    }
  }

  const toggleMute = (): void => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = !audio.muted
      setIsMuted(audio.muted)
    }
  }

  const setVolume = (vol: number): void => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, vol))
    }
  }

  return {
    pause,
    play,
    toggleMute,
    setVolume,
    isPlaying,
    isMuted,
    audioRef
  }
}
