'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function TechnicalDeepDive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProcess, setActiveProcess] = useState<'cascade' | 'push-pull'>('cascade')

  const cascadeSteps = [
    { step: 1, title: 'Reach', description: 'Extension toward the load' },
    { step: 2, title: 'Grip', description: 'Clamp onto slip sheet lip' },
    { step: 3, title: 'Pull', description: 'Load onto flat forks' },
    { step: 4, title: 'Lift', description: 'Raise and transport the load' },
    { step: 5, title: 'Level', description: 'Adjust forks to stabilize load' },
  ]

  const pushPullSteps = [
    { step: 1, title: 'Pull', description: 'Draw the load onto the flat forks' },
    { step: 2, title: 'Lift', description: 'Transport and position at destination' },
    { step: 3, title: 'Push', description: 'Eject the load forward by pushing the slip sheet off the forks' },
  ]

  const currentSteps = activeProcess === 'cascade' ? cascadeSteps : pushPullSteps

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
            Understanding the attachment process and equipment requirements
          </p>
        </motion.div>

        {/* Process Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setActiveProcess('cascade')}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeProcess === 'cascade'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Cascade Attachment
            </button>
            <button
              onClick={() => setActiveProcess('push-pull')}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeProcess === 'push-pull'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Push-Pull Process
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={activeProcess}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {currentSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">🏗️</div>
              <p className="text-lg text-primary-700 font-medium">
                {activeProcess === 'cascade' ? 'Cascade Attachment' : 'Push-Pull Process'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Equipment Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
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