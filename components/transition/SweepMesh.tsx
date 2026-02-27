'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useTransitionContext } from './TransitionProvider'
import { vertexShader } from './shaders/sweep.vert'
import { fragmentShader } from './shaders/sweep.frag'

export function SweepMesh() {
  const { transitionState, onSweepInComplete, onSweepOutComplete } =
    useTransitionContext()

  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768

  const uniforms = useRef({
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uNoiseAmp: { value: isMobile ? 0.005 : 0.02 },
    uGlowWidth: { value: isMobile ? 0.02 : 0.04 },
    uEdgeSoftness: { value: isMobile ? 0.05 : 0.03 },
  })

  useEffect(() => {
    if (!materialRef.current) return

    if (transitionState === 'sweeping-in') {
      gsap.killTweensOf(materialRef.current.uniforms.uProgress)
      materialRef.current.uniforms.uProgress.value = 0
      gsap.to(materialRef.current.uniforms.uProgress, {
        value: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: onSweepInComplete,
      })
    } else if (transitionState === 'sweeping-out') {
      gsap.killTweensOf(materialRef.current.uniforms.uProgress)
      gsap.to(materialRef.current.uniforms.uProgress, {
        value: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: onSweepOutComplete,
      })
    }
  }, [transitionState, onSweepInComplete, onSweepOutComplete])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <>
      <OrthographicCamera
        makeDefault
        args={[-1, 1, 1, -1, 0, 10]}
        position={[0, 0, 1]}
      />
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms.current}
          transparent
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  )
}
