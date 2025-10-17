'use client'

import { motion, useInView } from 'framer-motion'
import type { Variants, Easing } from "framer-motion"
import { useRef } from 'react'
import { MapPin, Mail, Phone, Globe2, Building2 } from 'lucide-react'

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const offices = [
    {
      country: 'India',
      city: 'Jaipur, Rajasthan',
      icon: '🇮🇳',
      email: 'sandeepjaju@yahoo.com',
      phone: '+91 98291-87167',
      address: 'Plt. 52, Soni Ka Bagh, Behind Alka Cinema, Sikar Road, Jaipur-302039 (Rajasthan)',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.178212556248!2d75.7718!3d26.9482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6f3cb0d52d7%3A0xa5c5e8e7d5432f0e!2sAlka%20Cinema!5e0!3m2!1sen!2sin!4v1697041234567!5m2!1sen!2sin',
      gradient: 'from-orange-500 to-green-500'
    },
    {
      country: 'UAE',
      city: 'Ajman, United Arab Emirates',
      icon: '🇦🇪',
      email: 'sandeepjaju@yahoo.com',
      phone: '+971 558570247',
      address: '308, Garden City, Jurf, Ajman, UAE',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.0102048171023!2d55.4820!3d25.4112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f72e2a4e7ef9%3A0x37b55c123d6f7f2b!2sGarden%20City%20Residences!5e0!3m2!1sen!2sae!4v1697044567890!5m2!1sen!2sae',
      gradient: 'from-red-500 to-green-600'
    }
  ]

  const cubicBezier: Easing = [0.22, 1, 0.36, 1]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: cubicBezier
      }
    }
  }

  const infoItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6"
          >
            <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Global <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Offices</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with our local teams for personalized support in your region
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {offices.map((office, index) => (
            <motion.div
              key={office.country}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${office.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Card Shadow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/10 rounded-3xl transform rotate-1 scale-[1.01] opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl sm:text-6xl"
                    >
                      {office.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        {office.country}
                      </h3>
                      <div className="flex items-center gap-2 text-primary-600">
                        <MapPin className="w-4 h-4" />
                        <p className="font-medium text-sm sm:text-base">{office.city}</p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="bg-primary-100 p-3 rounded-xl"
                  >
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </motion.div>
                </div>

                {/* Contact Information */}
                <motion.div
                  variants={containerVariants}
                  className="space-y-4 sm:space-y-5 mb-6 sm:mb-8"
                >
                  <motion.div
                    variants={infoItemVariants}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-300 group/item"
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover/item:shadow-md transition-shadow">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm mb-1">Email</p>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors break-all text-sm sm:text-base"
                      >
                        {office.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={infoItemVariants}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-300 group/item"
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover/item:shadow-md transition-shadow">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm mb-1">Phone</p>
                      <a
                        href={`tel:${office.phone}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors text-sm sm:text-base"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={infoItemVariants}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-300 group/item"
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover/item:shadow-md transition-shadow">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm mb-1">Address</p>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {office.address}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Embedded Google Map */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
                  <iframe
                    src={office.mapSrc}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-500"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}