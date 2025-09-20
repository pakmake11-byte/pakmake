'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Brochure Download', href: '/brochure' }
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
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary-400 mb-4">
                PakMake Packaging Inc®
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Leading provider of sustainable slip sheet solutions, helping businesses 
                reduce costs and environmental impact while improving logistics efficiency.
              </p>
              
              {/* Certification badges */}
              <div className="flex space-x-4">
                <div className="border border-gray-600 px-3 py-1 rounded text-sm">SFI®</div>
                <div className="border border-gray-600 px-3 py-1 rounded text-sm">ISO</div>
                <div className="border border-gray-600 px-3 py-1 rounded text-sm">Sedex</div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-primary-400 mb-1">India Office</h5>
                  <p className="text-sm text-gray-300">
                    Email: india@pakmake.com<br />
                    Phone: +91 XXX XXX XXXX
                  </p>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary-400 mb-1">UAE Office</h5>
                  <p className="text-sm text-gray-300">
                    Email: uae@pakmake.com<br />
                    Phone: +971 XXX XXX XXXX
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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