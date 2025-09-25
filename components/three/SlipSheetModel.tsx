'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SlipSheet() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <boxGeometry args={[2, 0.05, 1.5]} />
      <meshStandardMaterial color="#8B4513" />
      
      {/* Lip extensions */}
      <mesh position={[0, 0, 0.8]}>
        <boxGeometry args={[2, 0.05, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </mesh>
  )
}

export function SlipSheetModel() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[-1, 1, 1]} intensity={0.8} />
        
        <SlipSheet />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  )
}