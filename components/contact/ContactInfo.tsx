'use client'

import { motion, useInView, AnimatePresence, type Variants, type Easing } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MapPin, Mail, Phone, Globe2 } from 'lucide-react'

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const [scrollDirection, setScrollDirection] = useState(1)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const updateScrollDirection = () => {
      const direction = window.scrollY > lastScrollY ? 1 : -1
      setScrollDirection(direction)
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  const offices = [
    { country: 'India', city: 'Jaipur, Rajasthan', icon: '🇮🇳', email: 'sandeepjaju@yahoo.com', phone: '+91 98291-87167', address: 'Plt. 52, Soni Ka Bagh, Behind Alka Cinema, Sikar Road, Jaipur-302039 (Rajasthan)', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.178212556248!2d75.7718!3d26.9482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6f3cb0d52d7%3A0xa5c5e8e7d5432f0e!2sAlka%20Cinema!5e0!3m2!1sen!2sin!4v1697041234567!5m2!1sen!2sin' },
    { country: 'UAE', city: 'Ajman, UAE', icon: '🇦🇪', email: 'sandeepjaju@yahoo.com', phone: '+971 558570247', address: '308, Garden City, Jurf, Ajman, UAE', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.0102048171023!2d55.4820!3d25.4112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f72e2a4e7ef9%3A0x37b55c123d6f7f2b!2sGarden%20City%20Residences!5e0!3m2!1sen!2sae!4v1697044567890!5m2!1sen!2sae' },
  ]

  const cubicBezier: Easing = [0.65, 0, 0.35, 1]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        staggerDirection: scrollDirection,
        delayChildren: 0.3
      }
    },
    exit: { opacity: 0, transition: { duration: 0.6 } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: cubicBezier } },
    exit: { opacity: 0, y: -100, scale: 0.9, transition: { duration: 0.6, ease: cubicBezier } }
  }

  const infoItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: cubicBezier } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.4 } }
  }

  return (
    <AnimatePresence>
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="exit"
        className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: cubicBezier }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 shadow-lg"
            >
              <Globe2 className="w-10 h-10 text-blue-600" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Global <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Offices</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with our local teams for personalized support in your region
            </p>
          </motion.div>

          {/* Offices Grid */}
          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8"
          >
            {offices.map((office, index) => (
              <motion.div
                key={office.country}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Card Content - Split Layout */}
                <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden group h-full">
                  
                  {/* Left Side - Map */}
                  <div className="lg:flex h-full">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: cubicBezier }}
                      className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10" />
                      <iframe
                        src={office.mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                      ></iframe>
                    </motion.div>

                    {/* Right Side - Content */}
                    <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between relative">
                      {/* Decorative gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/30 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              className="text-5xl drop-shadow-md"
                            >
                              {office.icon}
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-0.5">
                                {office.country}
                              </h3>
                              <div className="flex items-center gap-1.5 text-blue-600">
                                <MapPin className="w-4 h-4" />
                                <p className="font-medium text-sm">{office.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info - Compact Grid */}
                        <motion.div variants={containerVariants} className="space-y-3">
                          {[
                            { icon: Mail, label: 'Email', value: office.email, href: `mailto:${office.email}`, short: office.email.split('@')[0] },
                            { icon: Phone, label: 'Phone', value: office.phone, href: `tel:${office.phone}`, short: office.phone },
                            { icon: MapPin, label: 'Address', value: office.address, href: null, short: office.address },
                          ].map((info, idx) => (
                            <motion.div
                              key={idx}
                              variants={infoItemVariants}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-2 rounded-lg group-hover/item:from-blue-100 group-hover/item:to-blue-50 transition-all duration-300 flex-shrink-0">
                                <info.icon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-xs mb-0.5 uppercase tracking-wide">{info.label}</p>
                                {info.href ? (
                                  <a href={info.href} className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium block truncate">
                                    {info.value}
                                  </a>
                                ) : (
                                  <p className="text-gray-700 text-sm leading-snug line-clamp-2">{info.value}</p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}