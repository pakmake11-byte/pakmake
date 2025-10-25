"use client";

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { Mail, Phone, MapPin, Award, Download, Home, Info, MessageSquare, Leaf, Recycle, TrendingUp } from 'lucide-react'

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About Us', href: '/about', icon: Info },
    { label: 'Contact Us', href: '/contact', icon: MessageSquare },
  ]

  const certificates = [
    { name: 'ISO Certificate', href: '/ISO.pdf' },
    { name: 'ROHS Certificate', href: '/ROHS.pdf' },
  ]

  const offices = [
    {
      name: 'India Office',
      country: 'India',
      address: 'Plot No. H-109A, Badharna, V.K.I. Area, JAIPUR-302013(Rajasthan)',
      email: 'sandeepjaju@yahoo.com',
      phone: '+91 98291-87167'
    },
    {
      name: 'UAE Office',
      country: 'UAE',
      address: '308, Garden City, Jurf, Ajman, UAE',
      email: 'sandeepjaju@yahoo.com',
      phone: '+971 558570247'
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background with grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {/* Company Info - Takes more space */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <motion.h3 
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              PakMake Packaging Inc®
            </motion.h3>
            <motion.p 
              className="text-gray-400 text-sm leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Leading provider of sustainable slip sheet solutions, helping businesses 
              reduce costs and environmental impact while improving logistics efficiency.
            </motion.p>

            <motion.a
              href="/home/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-sm font-semibold rounded-lg transition-all duration-300 group shadow-lg shadow-primary-900/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              <span>Download Brochure</span>
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-all inline-flex items-center gap-3 group py-1"
                  >
                    <link.icon className="w-4 h-4 text-primary-500 group-hover:scale-110 group-hover:text-primary-400 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Certificates */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"></div>
              Certificates
            </h4>
            <ul className="space-y-3">
              {certificates.map((cert, index) => (
                <motion.li 
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 text-sm transition-all inline-flex items-center gap-3 group py-1"
                  >
                    <Award className="w-4 h-4 text-primary-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-primary-400 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{cert.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"></div>
              Contact Us
            </h4>
            <div className="space-y-4">
              {offices.map((office, idx) => (
                <motion.div 
                  key={office.name}
                  className="space-y-3 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0, 160, 227, 0.15)" }}
                >
                  <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm">
                    <div className="p-1.5 bg-primary-500/10 rounded-lg">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span>{office.country}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{office.address}</p>
                  <div className="space-y-2">
                    <motion.a 
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary-400 transition-colors group"
                      whileHover={{ x: 2 }}
                    >
                      <Mail className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="break-all">{office.email}</span>
                    </motion.a>
                    <motion.a 
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary-400 transition-colors group"
                      whileHover={{ x: 2 }}
                    >
                      <Phone className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{office.phone}</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 PakMake Packaging Inc®. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Developer Credit */}
          <motion.div 
            className="text-center pt-4 border-t border-gray-700/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-500 text-xs">
              Developed with{' '}
              <motion.span 
                className="text-red-500 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ♥
              </motion.span>
              {' '}by{' '}
              <a 
                href="https://www.linkedin.com/in/preet-taparia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors hover:underline"
              >
                Preet Taparia
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}