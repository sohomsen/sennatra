'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NavLink } from '@/components/nav/NavLink'
import { RedButton } from '@/components/ui/RedButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDate, isRemoteUrl } from '@/lib/utils'
import type { MusicDoc } from '@/lib/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function FeaturedRelease({ item, coverUrl, heading = 'Latest Release', blurb }: { item: MusicDoc; coverUrl: string; heading?: string; blurb?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const prefersReduced = useReducedMotion()
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Cover image 3D tilt
  const rotateX = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 })

  function handleCoverMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || prefersReduced || !coverRef.current) return
    const rect = coverRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * 14)
    rotateX.set(-(y - 0.5) * 10)
  }

  function handleCoverMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  useGSAP(
    () => {
      if (!imageRef.current || !textRef.current) return

      gsap.from(imageRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(textRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef }
  )

  const coverSrc = coverUrl

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 max-w-5xl mx-auto"
      aria-label="Featured release"
    >
      <SectionHeading className="mb-12">{heading}</SectionHeading>
      {blurb && (
        <p className="text-brand-subtle text-sm tracking-wide mb-12 -mt-8">{blurb}</p>
      )}

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Cover image with 3D tilt */}
        <div ref={imageRef}>
          <motion.div
            ref={coverRef}
            className="relative aspect-square overflow-hidden cursor-default"
            style={
              !isTouch && !prefersReduced
                ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }
                : {}
            }
            onMouseMove={handleCoverMouseMove}
            onMouseLeave={handleCoverMouseLeave}
            whileHover={!isTouch && !prefersReduced ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={coverSrc}
              alt={`${item.frontmatter.title} cover`}
              fill
              unoptimized={isRemoteUrl(coverSrc)}
              className="object-cover"
            />
            {/* Red corner accent */}
            <div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-red"
              aria-hidden="true"
            />
            {/* Subtle red ambient glow on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: 'inset 0 0 40px rgba(128,0,0,0.2)',
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Text — staggered sub-elements */}
        <motion.div
          ref={textRef}
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p
            custom={0}
            variants={textItemVariants}
            className="text-brand-subtle text-xs tracking-[0.2em] uppercase"
          >
            {item.frontmatter.type && `${item.frontmatter.type} · `}{formatDate(item.frontmatter.date)}
          </motion.p>

          <motion.h3
            custom={1}
            variants={textItemVariants}
            className="font-display text-4xl md:text-5xl tracking-widest uppercase text-brand-text"
          >
            {item.frontmatter.title}
          </motion.h3>

          <motion.div
            custom={2}
            variants={textItemVariants}
            className="flex items-center gap-4 mt-4"
          >
            <NavLink href={`/music/${item.slug}`}>
              <RedButton as="span" variant="outline">
                Listen
              </RedButton>
            </NavLink>
            <NavLink
              href="/music"
              className="text-xs tracking-[0.15em] uppercase text-brand-subtle hover:text-brand-red transition-colors"
            >
              All releases →
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
