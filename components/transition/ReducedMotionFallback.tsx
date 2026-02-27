'use client'

// This component is used when prefers-reduced-motion is enabled.
// It wraps page content in a simple Framer Motion fade-in.
// The WebGL transition system skips entirely when reduced motion is detected
// (handled in TransitionProvider — triggerTransition calls router.push directly).
// This component is placed on individual pages via PageWrapper.

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function ReducedMotionFallback({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
