'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Wrench, Truck, DollarSign, TrendingUp, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { fadeInUpVariants, itemVariants, mediaRevealVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

const EASE_CUBIC = [0.65, 0, 0.35, 1] as const

export function TechnicalDeepDive() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const scrollDirection = useScrollDirection()

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current && !isNaN(time) && isFinite(time)) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      if (newMutedState) {
        setVolume(0)
      } else {
        setVolume(videoRef.current.volume || 1)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
        videoRef.current.muted = true
      } else if (isMuted) {
        setIsMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5)
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const processSteps = [
    {
      number: '1',
      title: 'Pull',
      description: 'Draw the load onto the flat forks using the slip sheet',
      image: '/home/pull.webp',
    },
    {
      number: '2',
      title: 'Lift & Transport',
      description: 'Raise and position the load at its destination',
      image: '/home/lift.webp',
    },
    {
      number: '3',
      title: 'Push',
      description: 'Eject the load by pushing the slip sheet off the forks',
      image: '/home/push.webp',
    }
  ]

  const equipment = [
    {
      icon: Wrench,
      title: 'Initial Investment',
      description: 'Consideration required',
      color: 'from-[#80D4F8] to-[#4DC4F5]'
    },
    {
      icon: Truck,
      title: 'Standard Forklifts',
      description: 'Compatible with existing equipment',
      color: 'from-[#4DC4F5] to-[#00A0E3]'
    },
    {
      icon: DollarSign,
      title: 'Push-Pull Attachment',
      description: 'Supplied by Cascade',
      color: 'from-[#00A0E3] to-[#007CB8]'
    },
    {
      icon: TrendingUp,
      title: 'ROI Timeline',
      description: 'For high-volume operations',
      color: 'from-[#007CB8] to-[#005F8C]'
    }
  ]

  const processStepsRef = useRef(null)
  const equipmentRef = useRef(null)
  const isProcessInView = useInView(processStepsRef, { once: false, margin: '-100px' })
  const isEquipmentInView = useInView(equipmentRef, { once: false, margin: '-100px' })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleProgress = () => {
      setCurrentTime(video.currentTime)
    }

    const handleDurationChange = () => {
      if (isFinite(video.duration) && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration)
      }
    }

    const handleLoadedMetadata = () => {
      if (isFinite(video.duration) && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration)
      }
    }

    const handleCanPlay = () => {
      if (isFinite(video.duration) && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration)
      }
    }

    video.addEventListener('timeupdate', handleProgress)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)

    if (isFinite(video.duration) && !isNaN(video.duration) && video.duration > 0) {
      setDuration(video.duration)
    }

    return () => {
      video.removeEventListener('timeupdate', handleProgress)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isInView && isPlaying) {
        videoRef.current.play().catch(() => { })
      } else if (!isInView) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isPlaying, isInView])

  useEffect(() => {
    if (isInView && videoRef.current) {
      setIsPlaying(true)
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.volume = 1
      setVolume(1)
      videoRef.current.play().catch(() => { })
    }
  }, [isInView])

  const getDirection = () => (scrollDirection === 1 ? 1 : -1)

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          title="Technical"
          highlightedText="Deep-Dive"
          subtitle="Understanding the push-pull attachment process and equipment requirements"
          isInView={isInView}
          icon={Truck}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 h-full"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-6">
                Cascade Push-Pull Attachment
              </h3>

              <div className="space-y-4 text-[#334155] leading-relaxed text-justify flex-1">
                <p className="text-base sm:text-lg">
                  The <strong>Cascade QFM Push Pull</strong> attachment offers a fast and efficient solution for switching between fork and slipsheet handling. Designed for convenience, it mounts directly onto forklift forks within a minute, enhancing workflow flexibility and productivity.
                </p>

                <p className="text-base sm:text-lg">
                  Built for long-term performance, it protects products and slipsheets from damage while maintaining high visibility and operational precision. Its durable steel construction ensures dependable use in demanding industrial environments.
                </p>

                <p className="text-base sm:text-lg">
                  The <strong>total cost is ₹7.5 lakh (including installation)</strong>, with <strong>taxes and transportation charges applicable separately</strong>.
                </p>
                <p className="text-base sm:text-lg italic">
                  <strong>Note:</strong> This attachment is essential for all material lifting and handling operations. Without it, accessing or moving materials will not be possible.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4 h-full flex flex-col"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 flex-1 flex flex-col">
              <motion.video
                ref={videoRef}
                variants={mediaRevealVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                src="/home/video.mp4"
                loop
                playsInline
                className="rounded-xl shadow-lg w-full object-cover flex-1"
              />

              <div className="mt-4 flex items-center gap-3">
                <span className="text-[#003E5C] text-sm font-medium min-w-[45px]">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration > 0 ? duration : 0.1}
                  step="0.1"
                  value={currentTime}
                  onChange={handleProgressChange}
                  disabled={duration === 0}
                  className="flex-1 h-2 bg-[#B3E5FC] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00A0E3] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-[#007CB8] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00A0E3] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:bg-[#007CB8]"
                  style={{
                    background: duration
                      ? `linear-gradient(to right, #00A0E3 0%, #00A0E3 ${(currentTime / duration) * 100}%, #B3E5FC ${(currentTime / duration) * 100}%, #B3E5FC 100%)`
                      : '#B3E5FC'
                  }}
                />
                <span className="text-[#003E5C] text-sm font-medium min-w-[45px]">
                  {formatTime(duration)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4 bg-primary-700 rounded-xl p-3">
                <button
                  onClick={skipBackward}
                  className="text-white hover:text-[#00A0E3] transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Skip backward 5 seconds"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="text-white hover:text-[#00A0E3] transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={skipForward}
                  className="text-white hover:text-[#00A0E3] transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Skip forward 5 seconds"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div className="w-px h-6 bg-white/20 mx-1" />

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#00A0E3] transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="hidden sm:flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-[#00A0E3] [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:hover:bg-[#00A0E3]"
                    style={{
                      background: `linear-gradient(to right, #00A0E3 0%, #00A0E3 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                    aria-label="Volume control"
                  />
                </div>

                <div className="w-px h-6 bg-white/20 mx-1" />

                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[#00A0E3] transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div
          ref={processStepsRef}
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isProcessInView ? 'visible' : 'hidden'}
          className="mb-16 sm:mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-8 sm:mb-12 text-center">
            Process Steps
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: getDirection() * 50, rotateX: getDirection() * 15 }}
                animate={isProcessInView ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0
                } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: EASE_CUBIC
                }}
                whileHover={{
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 flex flex-col perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#4DC4F5] to-[#00A0E3] text-white text-xl font-bold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isProcessInView ? {
                      scale: 1,
                      rotate: 0
                    } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.3,
                      type: 'spring',
                      stiffness: 200
                    }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {step.number}
                  </motion.div>

                  <h4 className="text-xl sm:text-2xl font-bold text-[#003E5C]">
                    {step.title}
                  </h4>
                </div>

                <motion.div
                  className="relative w-full h-[200px] rounded-xl overflow-hidden bg-white my-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isProcessInView ? {
                    opacity: 1,
                    scale: 1
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.4
                  }}
                >
                  <Image
                    src={step.image}
                    alt={`${step.title} step illustration`}
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <p className="text-sm sm:text-base text-[#334155] text-center leading-relaxed flex-1">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipment Requirements */}
        <motion.div
          ref={equipmentRef}
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isEquipmentInView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-8 sm:mb-12 text-center">
            Equipment Requirements
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: getDirection() * 60,
                  scale: 0.8,
                  rotateY: getDirection() * 20
                }}
                animate={isEquipmentInView ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateY: 0
                } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: EASE_CUBIC
                }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  rotateZ: 2,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 text-center hover:shadow-2xl transition-all duration-500 flex flex-col items-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="relative w-20 h-20 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isEquipmentInView ? {
                    scale: 1,
                    rotate: 0
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12 + 0.3,
                    type: 'spring',
                    stiffness: 180
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.15,
                    transition: { duration: 0.7 }
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl opacity-20`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.h4
                  className="text-lg sm:text-xl font-bold text-[#003E5C] mb-3"
                  initial={{ opacity: 0 }}
                  animate={isEquipmentInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.12 + 0.5 }}
                >
                  {item.title}
                </motion.h4>
                <motion.p
                  className="text-sm sm:text-base text-[#334155] flex-1"
                  initial={{ opacity: 0 }}
                  animate={isEquipmentInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.12 + 0.6 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}