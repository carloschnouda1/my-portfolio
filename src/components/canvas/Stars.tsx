'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Stars = () => {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      // Color - mix of blue, purple, and white
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        // Blue
        colors[i * 3] = 0.4
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
      } else if (colorChoice < 0.6) {
        // Purple
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.3
        colors[i * 3 + 2] = 1.0
      } else {
        // White
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 1.0
      }
    }

    return [positions, colors]
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005
      meshRef.current.rotation.x += 0.0002
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Stars
