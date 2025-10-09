'use client'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

type Lip = {
  pivot: THREE.Object3D
  axis: 'x' | 'z'
  sign: number
}

type VariantType = 'single-lip' | 'double-lip-opposite' | 'double-lip-adjacent' | 'multi-lip'

interface SlipSheetProps {
  variant?: VariantType
}

function SlipSheet({ variant = 'multi-lip' }: SlipSheetProps) {
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

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 4 + 1
      const opacity = Math.random() * 0.6 + 0.3

      ctx.fillStyle = `rgba(150, 120, 60, ${opacity})`
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const imageData = ctx.getImageData(0, 0, size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 40
      data[i] = Math.max(0, Math.min(255, data[i] + noise))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
    }

    ctx.putImageData(imageData, 0, 0)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1.5, 1.5)
    return texture
  }

  const kraftTexture = createKraftTexture()

  const createNormalMap = () => {
    const canvas = document.createElement('canvas')
    const size = 512
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    ctx.fillStyle = '#8080FF'
    ctx.fillRect(0, 0, size, size)

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 4 + 1
      const intensity = Math.random() * 15 + 5

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgb(128, 128, ${255 + intensity})`)
      gradient.addColorStop(1, `rgb(128, 128, ${255 - intensity})`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)
    return texture
  }

  const normalMap = createNormalMap()

  const cardboardMaterial = new THREE.MeshStandardMaterial({
    map: kraftTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
    roughness: 0.7,
    metalness: 0.0,
    side: THREE.DoubleSide,
    color: new THREE.Color('#FFD080')
  })

  useEffect(() => {
    if (!groupRef.current) return
    const slipGroup = groupRef.current
    slipGroup.clear()
    slipGroup.scale.set(1.3, 1.3, 1.3)

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

    // Build lips based on variant type
    if (variant === 'single-lip') {
      // Front lip only
      const frontPivot = new THREE.Object3D()
      frontPivot.position.set(0, thickness / 2, mainHeight / 2)
      slipGroup.add(frontPivot)
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, thickness, lipLength), cardboardMaterial)
      frontLip.position.set(0, 0, lipLength / 2)
      frontPivot.add(frontLip)
      tempLips.push({ pivot: frontPivot, axis: 'x', sign: -1 })
    } else if (variant === 'double-lip-opposite') {
      // Front and back lips
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
      // Front and left lips
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
      // All four lips
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

export function SlipSheetModel({ variant = 'multi-lip' }: { variant?: VariantType }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [10, 6, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[8, 12, 6]} intensity={0.8} color={'#ffd8a0'} />
        <pointLight position={[-5, 4, 6]} intensity={0.5} color={'#ffcc88'} />
        <SlipSheet variant={variant} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  )
}