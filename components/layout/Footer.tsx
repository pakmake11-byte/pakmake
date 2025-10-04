"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Brochure Download', href: '/brochure' }
  ]

  const certifications = [
    { name: 'BRC', fullName: 'BRC Packaging' },
    { name: 'FSC', fullName: 'FSC Certified' },
    { name: 'ISO', fullName: 'ISO Certified' },
    { name: 'Sedex', fullName: 'Sedex Member' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                PakMake Packaging Inc®
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Leading provider of sustainable slip sheet solutions, helping businesses 
                reduce costs and environmental impact while improving logistics efficiency.
              </p>

              {/* Certification badges */}
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:border-primary-500 transition-colors"
                    title={cert.fullName}
                  >
                    {cert.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <h5 className="font-medium text-white">India Office</h5>
                  </div>
                  <p className="text-sm text-gray-300 ml-6">
                    Plt. 52, Soni Ka Bagh, Behind Alka Cinema,<br />
                    Sikar Road, Jaipur-302039 (Rajasthan)
                  </p>
                  <div className="mt-2 ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-primary-400" />
                      <a href="mailto:sandeepjaju@yahoo.com" className="text-sm text-gray-300 hover:text-primary-400">
                        sandeepjaju@yahoo.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-primary-400" />
                      <a href="tel:+919829187167" className="text-sm text-gray-300 hover:text-primary-400">
                        +91 98291-87167
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <h5 className="font-medium text-white">UAE Office</h5>
                  </div>
                  <p className="text-sm text-gray-300 ml-6">
                    308, Garden City, Jurf,<br />
                    Ajman, UAE
                  </p>
                  <div className="mt-2 ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-primary-400" />
                      <a href="mailto:sandeepjaju@yahoo.com" className="text-sm text-gray-300 hover:text-primary-400">
                        sandeepjaju@yahoo.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-primary-400" />
                      <a href="tel:+971558570247" className="text-sm text-gray-300 hover:text-primary-400">
                        +971 558570247
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 PakMake Packaging Inc®. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}