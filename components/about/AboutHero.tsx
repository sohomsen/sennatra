'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const rotateX = useSpring(useMotionValue(0), { stiffness: 280, damping: 32 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 280, damping: 32 })

  const canAnimate = !isTouch && !prefersReduced

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!canAnimate || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * 14)  // ±7deg
    rotateX.set(-(y - 0.5) * 10) // ±5deg
  }

  function handleMouseEnter() {
    if (!canAnimate) return
    setIsHovered(true)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  return (
    <section
      className="relative min-h-[75vw] md:min-h-[calc(100vh-60px)] overflow-hidden"
      aria-label="About — photo"
    >
      <motion.div
        ref={containerRef}
        className="relative w-full h-full min-h-[75vw] md:min-h-[calc(100vh-60px)]"
        style={canAnimate ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' } : {}}
        whileHover={canAnimate ? { scale: 1.025 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Photo — rendered at natural color, no filters */}
        <Image
          src="/images/about-photo.jpg"
          alt="sennatra"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Gradient overlay — framing only, preserves natural photo tones */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, transparent 35%, rgba(10,10,10,0.35) 100%), linear-gradient(to right, transparent 65%, rgba(10,10,10,0.55) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Red glow border — animates in on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered && canAnimate ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: 'inset 0 0 0 2px rgba(128,0,0,0.55), 0 0 36px rgba(128,0,0,0.2)',
          }}
          aria-hidden="true"
        />

      </motion.div>
    </section>
  )
}
