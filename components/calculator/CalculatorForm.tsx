'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CalculatorData {
  currentPallets: number
  palletCost: number
  monthlyVolume: number
  shippingDistance: number
  warehouseSpace: number
  loadingTime: number
}

interface Results {
  costSavings: {
    monthly: number
    annual: number
  }
  efficiency: {
    spaceReduction: number
    weightReduction: number
    loadingTimeImprovement: number
  }
  environmental: {
    co2Reduction: number
    wasteReduction: number
  }
  roi: {
    paybackPeriod: number
    fiveYearSavings: number
  }
}

export function CalculatorForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CalculatorData>({
    currentPallets: 0,
    palletCost: 0,
    monthlyVolume: 0,
    shippingDistance: 0,
    warehouseSpace: 0,
    loadingTime: 0
  })
  const [results, setResults] = useState<Results | null>(null)

  const calculateResults = (data: CalculatorData): Results => {
    const slipSheetCost = 3.5 // Average cost per slip sheet
    const palletWeight = 20 // kg
    const slipSheetWeight = 0.8 // kg
    
    const monthlyCostSavings = (data.palletCost - slipSheetCost) * data.monthlyVolume
    const weightSavings = (palletWeight - slipSheetWeight) * data.monthlyVolume
    const spaceSavings = data.monthlyVolume * 0.98 // 98% space reduction
    
    return {
      costSavings: {
        monthly: monthlyCostSavings,
        annual: monthlyCostSavings * 12
      },
      efficiency: {
        spaceReduction: spaceSavings,
        weightReduction: weightSavings,
        loadingTimeImprovement: data.loadingTime * 0.4 // 40% improvement
      },
      environmental: {
        co2Reduction: weightSavings * 0.5, // Estimated CO2 reduction
        wasteReduction: data.monthlyVolume * 0.95 // 95% waste reduction
      },
      roi: {
        paybackPeriod: 6, // months
        fiveYearSavings: monthlyCostSavings * 60
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      const calculatedResults = calculateResults(formData)
      setResults(calculatedResults)
      setStep(5)
    }
  }

  const handleInputChange = (field: keyof CalculatorData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Current Pallet Usage</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of pallets used monthly
                </label>
                <input
                  type="number"
                  value={formData.currentPallets}
                  onChange={(e) => handleInputChange('currentPallets', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost per pallet ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.palletCost}
                  onChange={(e) => handleInputChange('palletCost', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 20.00"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Logistics Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly shipping volume (units)
                </label>
                <input
                  type="number"
                  value={formData.monthlyVolume}
                  onChange={(e) => handleInputChange('monthlyVolume', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average shipping distance (km)
                </label>
                <input
                  type="number"
                  value={formData.shippingDistance}
                  onChange={(e) => handleInputChange('shippingDistance', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 500"
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Operational Efficiency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warehouse space used (m²)
                </label>
                <input
                  type="number"
                  value={formData.warehouseSpace}
                  onChange={(e) => handleInputChange('warehouseSpace', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loading time per shipment (minutes)
                </label>
                <input
                  type="number"
                  value={formData.loadingTime}
                  onChange={(e) => handleInputChange('loadingTime', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 60"
                />
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">Review Your Information</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Monthly Pallets</p>
                  <p className="text-lg font-semibold">{formData.currentPallets.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost per Pallet</p>
                  <p className="text-lg font-semibold">${formData.palletCost}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Volume</p>
                  <p className="text-lg font-semibold">{formData.monthlyVolume.toLocaleString()} units</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shipping Distance</p>
                  <p className="text-lg font-semibold">{formData.shippingDistance} km</p>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600">
              Click &quot;Calculate Savings&quot; to see your potential benefits
            </p>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Savings Report</h3>
              <p className="text-gray-600">Based on your inputs, here&quot;s what you could save with PakMake slip sheets</p>
            </div>

            {results && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Cost Savings */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-green-800 mb-4">💰 Cost Savings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Waste Reduction</span>
                      <span className="font-bold text-emerald-800">{results.environmental.wasteReduction.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {/* ROI Timeline */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-purple-800 mb-4">📈 Return on Investment</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Payback Period</span>
                      <span className="font-bold text-purple-800">{results.roi.paybackPeriod} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">5-Year Savings</span>
                      <span className="font-bold text-purple-800">${results.roi.fiveYearSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors">
                Download Report
              </button>
              <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-full hover:bg-primary-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Savings Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how much you could save by switching to PakMake slip sheets. 
            Get your personalized analysis in just a few steps.
          </p>
        </motion.div>

        {step < 5 && (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < 4 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              {step > 1 && step < 5 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              
              {step < 5 && (
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors ml-auto"
                >
                  {step === 4 ? 'Calculate Savings' : 'Next Step'}
                </button>
              )}
              
              {step === 5 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(1)
                    setResults(null)
                  }}
                  className="px-6 py-3 border border-primary-600 text-primary-600 rounded-full hover:bg-primary-50 transition-colors"
                >
                  Start Over
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}