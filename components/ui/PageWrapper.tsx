'use client'

// Wraps each page's content with a subtle fade-in.
// Acts as the fallback animation when prefers-reduced-motion is set
// (WebGL transition is skipped, this provides a soft entrance instead).

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
