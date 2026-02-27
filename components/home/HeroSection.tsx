'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from '@/components/nav/NavLink'
import { RedButton } from '@/components/ui/RedButton'

// ParticleField is heavy — load client-side only, never SSR
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

interface HeroSectionProps {
  tagline?: string
  subline?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function HeroSection({
  tagline = 'Electronic artist. Dark ambient. Industrial.',
  subline,
  ctaLabel = 'Listen Now',
  ctaHref = '/music',
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-driven parallax: content drifts up and fades as user scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* Ambient particle background */}
      <ParticleField />

      {/* Red ambient glow — warm presence behind logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(128,0,0,0.18) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, #0a0a0a 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — scroll-driven parallax wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo — replaces text heading */}
          <motion.div variants={itemVariants}>
            <Image
              src="/logo.svg"
              alt="sennatra"
              width={700}
              height={175}
              priority
              className="w-[clamp(320px,62vw,920px)] h-auto"
            />
          </motion.div>

          {/* Red separator */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-brand-red my-2"
            aria-hidden="true"
          />

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-brand-subtle text-sm md:text-base tracking-[0.15em] uppercase max-w-sm"
          >
            {tagline}
          </motion.p>

          {/* Optional subline */}
          {subline && (
            <motion.p
              variants={itemVariants}
              className="text-brand-subtle/60 text-xs tracking-[0.12em] uppercase max-w-sm mt-1"
            >
              {subline}
            </motion.p>
          )}

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-4">
            <NavLink href={ctaHref}>
              <RedButton as="span" variant="outline">
                {ctaLabel}
              </RedButton>
            </NavLink>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-brand-subtle">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-brand-subtle origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
