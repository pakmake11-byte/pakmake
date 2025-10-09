"use client";

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

type Lip = {
  pivot: THREE.Object3D
  axis: 'x' | 'z'
  sign: number
}

type VariantType = 'single-lip' | 'double-lip-opposite' | 'double-lip-adjacent' | 'multi-lip'

function SlipSheet({ variant = 'multi-lip' }: { variant: VariantType }) {
  const groupRef = useRef<THREE.Group>(null)
  const [lips, setLips] = useState<Lip[]>([])

  const createKraftTexture = () => {
    const canvas = document.createElement('canvas')
    const size = 512
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    ctx.fillStyle = '#D4A055'
    ctx.fillRect(0, 0, size, size)

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 30 + 10
      const opacity = Math.random() * 0.3 + 0.1

      const colors = ['#C8923C', '#DAA052', '#B77E36', '#E0B060']
      const color = colors[Math.floor(Math.random() * colors.length)]

      ctx.fillStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const length = Math.random() * 20 + 8
      const angle = Math.random() * Math.PI * 2
      const opacity = Math.random() * 0.4 + 0.2

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.strokeStyle = `rgba(200, 160, 80, ${opacity})`
      ctx.lineWidth = Math.random() * 2 + 0.5
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(length, 0)
      ctx.stroke()
      ctx.restore()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1.5, 1.5)
    return texture
  }

  const kraftTexture = createKraftTexture()

  const cardboardMaterial = new THREE.MeshStandardMaterial({
    map: kraftTexture,
    roughness: 0.7,
    metalness: 0.0,
    side: THREE.DoubleSide,
    color: new THREE.Color('#FFD080')
  })

  useEffect(() => {
    if (!groupRef.current) return
    const slipGroup = groupRef.current
    slipGroup.clear()
    slipGroup.scale.set(0.8, 0.8, 0.8)

    const thickness = 0.04
    const mainWidth = 8
    const mainHeight = 6
    const lipLength = 0.6

    const mainMesh = new THREE.Mesh(
      new THREE.BoxGeometry(mainWidth, thickness, mainHeight),
      cardboardMaterial
    )
    slipGroup.add(mainMesh)

    const tempLips: Lip[] = []

    if (variant === 'single-lip') {
      const frontPivot = new THREE.Object3D()
      frontPivot.position.set(0, thickness / 2, mainHeight / 2)
      slipGroup.add(frontPivot)
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      frontLip.position.set(0, 0, lipLength / 2)
      frontPivot.add(frontLip)
      tempLips.push({ pivot: frontPivot, axis: 'x', sign: -1 })
    } else if (variant === 'double-lip-opposite') {
      const frontPivot = new THREE.Object3D()
      frontPivot.position.set(0, thickness / 2, mainHeight / 2)
      slipGroup.add(frontPivot)
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      frontLip.position.set(0, 0, lipLength / 2)
      frontPivot.add(frontLip)
      tempLips.push({ pivot: frontPivot, axis: 'x', sign: -1 })

      const backPivot = new THREE.Object3D()
      backPivot.position.set(0, thickness / 2, -mainHeight / 2)
      slipGroup.add(backPivot)
      const backLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      backLip.position.set(0, 0, -lipLength / 2)
      backPivot.add(backLip)
      tempLips.push({ pivot: backPivot, axis: 'x', sign: 1 })
    } else if (variant === 'double-lip-adjacent') {
      const frontPivot = new THREE.Object3D()
      frontPivot.position.set(0, thickness / 2, mainHeight / 2)
      slipGroup.add(frontPivot)
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      frontLip.position.set(0, 0, lipLength / 2)
      frontPivot.add(frontLip)
      tempLips.push({ pivot: frontPivot, axis: 'x', sign: -1 })

      const leftPivot = new THREE.Object3D()
      leftPivot.position.set(-mainWidth / 2, thickness / 2, 0)
      slipGroup.add(leftPivot)
      const leftLip = new THREE.Mesh(new THREE.BoxGeometry(lipLength, thickness, mainHeight), cardboardMaterial)
      leftLip.position.set(-lipLength / 2, 0, 0)
      leftPivot.add(leftLip)
      tempLips.push({ pivot: leftPivot, axis: 'z', sign: -1 })
    } else if (variant === 'multi-lip') {
      const frontPivot = new THREE.Object3D()
      frontPivot.position.set(0, thickness / 2, mainHeight / 2)
      slipGroup.add(frontPivot)
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      frontLip.position.set(0, 0, lipLength / 2)
      frontPivot.add(frontLip)
      tempLips.push({ pivot: frontPivot, axis: 'x', sign: -1 })

      const backPivot = new THREE.Object3D()
      backPivot.position.set(0, thickness / 2, -mainHeight / 2)
      slipGroup.add(backPivot)
      const backLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      backLip.position.set(0, 0, -lipLength / 2)
      backPivot.add(backLip)
      tempLips.push({ pivot: backPivot, axis: 'x', sign: 1 })

      const leftPivot = new THREE.Object3D()
      leftPivot.position.set(-mainWidth / 2, thickness / 2, 0)
      slipGroup.add(leftPivot)
      const leftLip = new THREE.Mesh(new THREE.BoxGeometry(lipLength, thickness, mainHeight), cardboardMaterial)
      leftLip.position.set(-lipLength / 2, 0, 0)
      leftPivot.add(leftLip)
      tempLips.push({ pivot: leftPivot, axis: 'z', sign: -1 })

      const rightPivot = new THREE.Object3D()
      rightPivot.position.set(mainWidth / 2, thickness / 2, 0)
      slipGroup.add(rightPivot)
      const rightLip = new THREE.Mesh(new THREE.BoxGeometry(lipLength, thickness, mainHeight), cardboardMaterial)
      rightLip.position.set(lipLength / 2, 0, 0)
      rightPivot.add(rightLip)
      tempLips.push({ pivot: rightPivot, axis: 'z', sign: 1 })
    }

    setLips(tempLips)
  }, [variant])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05

    lips.forEach((l, idx) => {
      const phase = idx * Math.PI / 6
      const angle = (Math.sin(t * 2 + phase) * 0.5 + 0.5) * (Math.PI / 2)
      if (l.axis === 'x') l.pivot.rotation.x = l.sign * angle
      else l.pivot.rotation.z = l.sign * angle
    })
  })

  return <group ref={groupRef} />
}

export function ProductVariants() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('single-lip')

  const variants = [
    {
      id: 'single-lip' as VariantType,
      title: 'Single-Lip',
      description: 'Access from one side',
      icon: '📄',
      specs: { thickness: '0.8-1.2mm', size: 'Custom', capacity: '1000-2000kg' }
    },
    {
      id: 'double-lip-opposite' as VariantType,
      title: 'Double-Lip (Opposite)',
      description: 'Access from two opposite sides',
      icon: '📑',
      specs: { thickness: '1.0-1.5mm', size: 'Custom', capacity: '1500-2500kg' }
    },
    {
      id: 'double-lip-adjacent' as VariantType,
      title: 'Double-Lip (Adjacent)',
      description: 'Access from two adjacent sides',
      icon: '📋',
      specs: { thickness: '1.2-1.8mm', size: 'Custom', capacity: '2000-3000kg' }
    },
    {
      id: 'multi-lip' as VariantType,
      title: 'Multi-Lip',
      description: 'Access from all four sides',
      icon: '📊',
      specs: { thickness: '1.5-2.0mm', size: 'Custom', capacity: '2500-4000kg' }
    }
  ]

  const comparisonData = [
    { attribute: 'Primary Use', kraft: 'Export Shipments Only', plastic: 'Export & Internal Warehouse' },
    { attribute: 'Cost Range', kraft: '₹250-400 per sheet', plastic: '₹300-500 per sheet' },
    { attribute: 'Load Capacity', kraft: '800-2000 Kg', plastic: '800-3500 Kg' },
    { attribute: 'Reusability', kraft: '4-5 times', plastic: '50-100 times' },
    { attribute: 'Moisture Resistance', kraft: 'Limited', plastic: 'Excellent' },
    { attribute: 'Storage Duration', kraft: '3 Months', plastic: 'Unlimited' },
    { attribute: 'Cost Saving', kraft: '60-65%', plastic: '70-75%' },
    { attribute: 'Recyclable', kraft: '100% Recyclable', plastic: '100% Recyclable' }
  ]

  const dimensionsData = [
    { dimension: 'Length (L)', standard: '1000/1200/800 mm', alternative: 'Optional up to 1500 mm' },
    { dimension: 'Channelling (CL)', standard: '50/75/100 mm', alternative: '50mm - 100mm' },
    { dimension: 'Width (W)', standard: '1000/1200/800 mm', alternative: 'Optional up to 1500 mm' },
    { dimension: 'Channelling (CW)', standard: '50/75/100 mm', alternative: '50mm - 100mm' }
  ]

  const thicknessData = [
    { thickness: '0.8 mm', strength: 'Up to 800 kg' },
    { thickness: '0.9 mm', strength: 'Up to 1,200 kg' },
    { thickness: '1.0 mm', strength: 'Up to 1,500 kg' },
    { thickness: '1.2 mm', strength: 'Up to 1,800 kg' },
    { thickness: '1.5 mm', strength: 'Up to 2,200 kg' },
    { thickness: '1.8 mm', strength: 'Up to 2,700 kg' },
    { thickness: '2.0 mm', strength: 'Up to 3,200 kg' }
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
            Product Variants & Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from multiple configurations and materials to match your specific handling requirements
          </p>
        </motion.div>

        {/* Material Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Material Comparison</h3>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <th className="px-8 py-6 text-left font-bold text-white text-lg">Specifications</th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">
                      <div className="flex items-center justify-center space-x-3">
                        <span>Kraft Paper Slip Sheet</span>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">
                      <div className="flex items-center justify-center space-x-3">
                        <span>PP Plastic Slip Sheet</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.attribute}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                        }`}
                    >
                      <td className="px-8 py-4 font-semibold text-gray-800 text-lg">
                        {row.attribute}
                      </td>
                      <td className="px-8 py-6 text-center text-gray-700">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.2 }}
                          className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium"
                        >
                          {row.kraft}
                        </motion.span>
                      </td>
                      <td className="px-8 py-6 text-center text-gray-700">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
                          className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
                        >
                          {row.plastic}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Lip Configurations with 2x2 Grid and 3D Model */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lip Configurations</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: 2x2 Grid for Lip Options */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {variants.map((variant, index) => (
                  <motion.button
                    key={variant.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`p-8 rounded-2xl transition-all duration-300 group relative overflow-hidden text-left ${selectedVariant === variant.id
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl'
                        : 'bg-white text-gray-900 hover:shadow-xl border border-gray-200'
                      }`}
                  >
                    <div className="relative z-10">
                      <h4 className="font-bold text-2xl mb-2">{variant.title}</h4>
                      <p className={`text-sm mb-4 ${selectedVariant === variant.id ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                        {variant.description}
                      </p>
                    </div>

                    {selectedVariant === variant.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: 3D Model Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="items-center justify-center relative overflow-hidden"
              style={{ minHeight: '400px' }}
            >
              <motion.div
                key={selectedVariant}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white text-lg">Loading 3D Model...</div>
                  </div>
                }>
                  <Canvas camera={{ position: [10, 6, 10], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[8, 12, 6]} intensity={0.8} color={'#ffd8a0'} />
                    <pointLight position={[-5, 4, 6]} intensity={0.5} color={'#ffcc88'} />
                    <SlipSheet variant={selectedVariant} />
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      autoRotate
                      autoRotateSpeed={0.5}
                    />
                  </Canvas>
                </Suspense>
              </motion.div>

              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/80 text-sm font-medium">
                  {variants.find(v => v.id === selectedVariant)?.title}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dimensions Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Slip Sheet Dimensions</h3>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <th className="px-8 py-6 text-left font-bold text-white text-lg">Dimension</th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">Standard</th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">Alternative</th>
                  </tr>
                </thead>
                <tbody>
                  {dimensionsData.map((row, index) => (
                    <motion.tr
                      key={row.dimension}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className={`border-b border-gray-100 hover:bg-gray-50/80 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                        }`}
                    >
                      <td className="px-8 py-5 font-semibold text-gray-800">{row.dimension}</td>
                      <td className="px-8 py-5 text-center text-gray-700">{row.standard}</td>
                      <td className="px-8 py-5 text-center text-gray-700">{row.alternative}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Thickness & Pulling Strength Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Thickness & Pulling Strength</h3>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <th className="px-8 py-6 text-left font-bold text-white text-lg">Thickness</th>
                    <th className="px-8 py-6 text-center font-bold text-white text-lg">Pulling Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {thicknessData.map((row, index) => (
                    <motion.tr
                      key={row.thickness}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                      className={`border-b border-gray-100 hover:bg-gray-50/80 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                        }`}
                    >
                      <td className="px-8 py-5 font-semibold text-gray-800">{row.thickness}</td>
                      <td className="px-8 py-5 text-center text-gray-700">{row.strength}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}