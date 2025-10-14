'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const FloatingShape = ({ position, color, shape }: { position: [number, number, number], color: string, shape: 'box' | 'sphere' | 'octahedron' }) => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'sphere' && <sphereGeometry args={[0.7, 16, 16]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[0.8]} />}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        wireframe={shape === 'octahedron'}
      />
    </mesh>
  )
}

const FloatingShapes = () => {
  const shapes = [
    { position: [5, 2, -5] as [number, number, number], color: '#a855f7', shape: 'box' as const },
    { position: [-3, 1, -8] as [number, number, number], color: '#667eea', shape: 'sphere' as const },
    { position: [8, -1, -3] as [number, number, number], color: '#4facfe', shape: 'octahedron' as const },
    { position: [-6, 3, -6] as [number, number, number], color: '#a855f7', shape: 'sphere' as const },
    { position: [2, -2, -10] as [number, number, number], color: '#667eea', shape: 'box' as const },
    { position: [-8, 0, -4] as [number, number, number], color: '#4facfe', shape: 'octahedron' as const },
    { position: [6, -3, -8] as [number, number, number], color: '#a855f7', shape: 'sphere' as const },
    { position: [-2, 2, -12] as [number, number, number], color: '#667eea', shape: 'box' as const },
  ]

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          shape={shape.shape}
        />
      ))}
    </>
  )
}

export default FloatingShapes
