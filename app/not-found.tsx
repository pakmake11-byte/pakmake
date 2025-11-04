'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ArrowLeft, Package, Search } from 'lucide-react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-primary-950 px-4"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs with parallax effect */}
            <motion.div
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: -mousePosition.x,
                y: -mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"
            />
            
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  x: [null, Math.random() * window.innerWidth],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,160,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,160,227,0.03)_1px,transparent_1px)] bg-size-[64px_64px]"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Animated 404 with package icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.2 
              }}
              className="relative mb-8"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                <Package className="w-28 h-28 text-primary-400 mx-auto drop-shadow-2xl" strokeWidth={1.5} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-8xl sm:text-9xl font-black mb-2 bg-linear-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent drop-shadow-2xl"
              >
                404
              </motion.h1>
            </motion.div>

            {/* Error message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4 mb-12"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Page Not Found
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Looks like this package got lost in transit. The page you're looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full overflow-hidden shadow-xl transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-primary-600 to-primary-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Go to Homepage
                  </span>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:border-primary-400/50 transition-all shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </span>
              </motion.button>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="absolute -top-20 -right-20 w-40 h-40 border-4 border-primary-500/20 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute -bottom-20 -left-20 w-60 h-60 border-4 border-primary-400/10 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}