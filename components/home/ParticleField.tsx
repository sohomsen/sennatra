'use client'

// Dynamically imported — never server-rendered.
// Sparse, slow-moving point cloud on near-black background.
// Ambient mood only; deliberately not distracting.

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT_DESKTOP = 200
const PARTICLE_COUNT_MOBILE = 90

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      sz[i] = Math.random() * 0.015 + 0.005
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    // Very slow drift rotation — atmospheric only
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.012
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.007) * 0.06
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#888888"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleField() {
  const count =
    typeof window !== 'undefined' && window.innerWidth < 768
      ? PARTICLE_COUNT_MOBILE
      : PARTICLE_COUNT_DESKTOP

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Particles count={count} />
    </Canvas>
  )
}
