import { useEffect, useRef, useState, useCallback } from 'react'

interface UseAudioManagerOptions {
  src: string
  volume?: number
  loop?: boolean
}

const audioState = {
  isMuted: true,
  isPlaying: false,
  volume: 0.4
}

export function useAudioManager({
  src,
  volume = 0.4,
  loop = true,
}: UseAudioManagerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const [isPlaying, setIsPlaying] = useState(audioState.isPlaying)
  const [isMuted, setIsMuted] = useState(audioState.isMuted)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = Math.max(0, Math.min(1, audioState.volume))
    audio.muted = audioState.isMuted
    audioRef.current = audio

    const onPlay = () => {
      setIsPlaying(true)
      audioState.isPlaying = true
    }
    const onPause = () => {
      setIsPlaying(false)
      audioState.isPlaying = false
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // Resume playing if it was playing before
    if (audioState.isPlaying && !audioState.isMuted) {
      const promise = audio.play()
      if (promise !== undefined) {
        playPromiseRef.current = promise
        promise.catch((err) => {
          if (!(err instanceof DOMException && err.name === 'NotAllowedError')) {
            console.error('Audio play error while restoring state:', err)
          }
        }).finally(() => {
          if (playPromiseRef.current === promise) {
            playPromiseRef.current = null
          }
        })
      }
    }

    return () => {
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          audio.pause()
        }).catch(() => {
          audio.pause()
        })
      } else {
        audio.pause()
      }
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
  }, [src, loop])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
    audioState.isMuted = isMuted
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
    audioState.volume = volume
  }, [volume])

  const pause = useCallback(async (): Promise<void> => {
    const audio = audioRef.current
    if (audio) {
      // Wait for any pending play promise before pausing
      if (playPromiseRef.current) {
        await playPromiseRef.current.catch(() => {})
        playPromiseRef.current = null
      }
      audio.pause()
      setIsPlaying(false)
      audioState.isPlaying = false
    }
  }, [])

  const play = useCallback(async (): Promise<void> => {
    const audio = audioRef.current
    if (audio) {
      // Wait for any pending play promise before starting a new one
      if (playPromiseRef.current) {
        await playPromiseRef.current.catch(() => {})
      }
      
      try {
        const promise = audio.play()
        if (promise !== undefined) {
          playPromiseRef.current = promise
          await promise
          setIsPlaying(true)
          audioState.isPlaying = true
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
          console.error('Unexpected play() error:', error)
        }
      } finally {
        playPromiseRef.current = null
      }
    }
  }, [])

  const toggleMute = useCallback(async (): Promise<void> => {
    const audio = audioRef.current
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    audioState.isMuted = newMutedState

    if (audio) {
      audio.muted = newMutedState
    }

    if (!newMutedState && audio && !isPlaying) {
      // Wait for any pending play promise
      if (playPromiseRef.current) {
        await playPromiseRef.current.catch(() => {})
      }
      
      try {
        const promise = audio.play()
        if (promise !== undefined) {
          playPromiseRef.current = promise
          await promise
          setIsPlaying(true)
          audioState.isPlaying = true
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
          console.error('Error playing after unmute:', error)
        }
      } finally {
        playPromiseRef.current = null
      }
    }
  }, [isMuted, isPlaying])

  const setVolume = (vol: number): void => {
    const audio = audioRef.current
    const clamped = Math.max(0, Math.min(1, vol))
    if (audio) {
      audio.volume = clamped
    }
    audioState.volume = clamped
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