'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function TechnicalDeepDive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Technical Deep-Dive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the push-pull attachment process and equipment requirements
          </p>
        </motion.div>

        {/* Process Description */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Push-Pull Process</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The push-pull attachment system is a highly efficient material handling solution that eliminates the need for traditional pallets. This innovative approach uses specialized slip sheets combined with push-pull attachments to streamline warehouse operations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The process begins by pulling loads onto flat forks using the slip sheet, then transporting them to the destination. Finally, the load is ejected forward by pushing the slip sheet off the forks, creating a seamless handling experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This method significantly reduces storage space requirements, eliminates pallet management costs, and increases operational efficiency in high-volume warehouse environments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">🔄</div>
              <p className="text-lg text-primary-700 font-medium">
                Push-Pull Process
              </p>
            </div>
          </motion.div>
        </div>

        {/* Process Steps Images Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Process Steps
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 - Pull */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Step 1 Image</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Pull</h4>
              <p className="text-gray-600 text-sm">Draw the load onto the flat forks using the slip sheet</p>
            </div>

            {/* Step 2 - Transport */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Step 2 Image</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Lift & Transport</h4>
              <p className="text-gray-600 text-sm">Raise and position the load at its destination</p>
            </div>

            {/* Step 3 - Push */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Step 3 Image</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Push</h4>
              <p className="text-gray-600 text-sm">Eject the load by pushing the slip sheet off the forks</p>
            </div>
          </div>
        </motion.div>

        {/* Equipment Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Equipment Requirements
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold text-gray-900 mb-2">Push-pull attachment</h4>
              <p className="text-sm text-gray-600">Supplied by Cascade</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🚛</div>
              <h4 className="font-semibold text-gray-900 mb-2">Standard forklifts</h4>
              <p className="text-sm text-gray-600">Compatible with existing equipment</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Initial investment</h4>
              <p className="text-sm text-gray-600">Consideration required</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-semibold text-gray-900 mb-2">ROI timeline</h4>
              <p className="text-sm text-gray-600">For high-volume operations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}