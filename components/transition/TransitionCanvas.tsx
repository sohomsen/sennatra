'use client'

import { Canvas } from '@react-three/fiber'
import { SweepMesh } from './SweepMesh'
import { useTransitionContext } from './TransitionProvider'

// This component is always mounted but visually invisible when idle.
// uProgress = 0 → shader renders fully transparent.
// pointer-events: none ensures it never blocks user interaction.

export default function TransitionCanvas() {
  const { transitionState } = useTransitionContext()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        // Keep canvas in the DOM to avoid WebGL context re-init cost.
        // Visibility toggles prevent unnecessary compositing when idle.
        visibility: transitionState === 'idle' ? 'hidden' : 'visible',
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        frameloop="always"
        style={{ position: 'absolute', inset: 0 }}
      >
        <SweepMesh />
      </Canvas>
    </div>
  )
}
