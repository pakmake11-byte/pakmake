'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Wrench, Truck, DollarSign, TrendingUp, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { fadeInUpVariants, itemVariants, cardVariants, createContainerVariants, stepBadgeVariants, mediaRevealVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function TechnicalDeepDive() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
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
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
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
      title: 'Push-Pull Attachment',
      description: 'Supplied by Cascade',
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
      title: 'Initial Investment',
      description: 'Consideration required',
      color: 'from-[#00A0E3] to-[#007CB8]'
    },
    {
      icon: TrendingUp,
      title: 'ROI Timeline',
      description: 'For high-volume operations',
      color: 'from-[#007CB8] to-[#005F8C]'
    }
  ]

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

    // Add event listeners
    video.addEventListener('timeupdate', handleProgress)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)

    // Check if duration is already available
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

  // Auto-play when video comes into view
  useEffect(() => {
    if (isInView && videoRef.current) {
      setIsPlaying(true)
      videoRef.current.play().catch(() => { })
    }
  }, [isInView])


  const containerVariants = createContainerVariants()

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionHeader
          title="Technical"
          highlightedText="Deep-Dive"
          subtitle="Understanding the push-pull attachment process and equipment requirements"
          isInView={isInView}
          icon={Truck}
        />

        {/* Push-Pull Process + Video */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 h-full"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-6">
                Push-Pull Process
              </h3>
              <div className="space-y-4 text-[#334155] leading-relaxed text-justify flex-1">
                <p className="text-base sm:text-lg">
                  The push-pull attachment system is a highly efficient material handling solution that eliminates the need for traditional pallets. This innovative approach uses specialized slip sheets combined with push-pull attachments to streamline warehouse operations.
                </p>
                <p className="text-base sm:text-lg">
                  The process begins by pulling loads onto flat forks using the slip sheet, then transporting them to the destination. Finally, the load is ejected forward by pushing the slip sheet off the forks, creating a seamless handling experience.
                </p>
                <p className="text-base sm:text-lg">
                  This method significantly reduces storage space requirements, eliminates pallet management costs, and increases operational efficiency in high-volume warehouse environments.
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
                muted
                playsInline
                className="rounded-xl shadow-lg w-full object-cover flex-1"
              />

              {/* Video Progress Bar */}
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

              {/* Video Controls */}
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

                {/* Volume Control */}
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
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 sm:mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-8 sm:mb-12 text-center">
            Process Steps
          </h3>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Number and Title in one line */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#4DC4F5] to-[#00A0E3] text-white text-xl font-bold shadow-lg"
                    variants={stepBadgeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.number}
                  </motion.div>

                  <h4 className="text-xl sm:text-2xl font-bold text-[#003E5C]">
                    {step.title}
                  </h4>
                </div>

                {/* Bigger Image */}
                <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-white">
                  <Image
                    src={step.image}
                    alt={`${step.title} step illustration`}
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-sm sm:text-base text-[#334155] leading-relaxed flex-1">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Equipment Requirements */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#003E5C] mb-8 sm:mb-12 text-center">
            Equipment Requirements
          </h3>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {equipment.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-6 text-center hover:shadow-2xl transition-all duration-500 flex flex-col items-center"
              >
                <div className="relative w-20 h-20 mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl opacity-20`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#003E5C] mb-3">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-[#334155] flex-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}