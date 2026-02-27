'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from '@/components/nav/NavLink'
import { RedButton } from '@/components/ui/RedButton'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface AboutSnippetProps {
  heading?: string
  bioSnippet?: string
}

export default function AboutSnippet({
  heading = 'About',
  bioSnippet = 'Crafting music at the intersection of darkness and precision. Every release is a study in restraint and intention.',
}: AboutSnippetProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Counter-directional parallax for depth
  const headingY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-10 border-t border-brand-muted overflow-hidden"
      aria-label="About"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: heading + cta — parallax upward */}
        <motion.div style={{ y: headingY }}>
          <SectionHeading className="mb-8">{heading}</SectionHeading>
          <NavLink href="/about">
            <RedButton as="span" variant="outline">
              Full Story
            </RedButton>
          </NavLink>
        </motion.div>

        {/* Right: bio text — parallax downward (deeper range) */}
        <motion.p
          style={{ y: textY }}
          className="text-brand-subtle text-base md:text-lg leading-relaxed tracking-wide"
        >
          {bioSnippet}
        </motion.p>
      </div>
    </motion.section>
  )
}
