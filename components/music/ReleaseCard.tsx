'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { NavLink } from '@/components/nav/NavLink'
import { formatDateShort, isRemoteUrl } from '@/lib/utils'
import type { MusicDoc } from '@/lib/types'

export function ReleaseCard({ item, index, coverUrl }: { item: MusicDoc; index: number; coverUrl: string }) {
  const coverSrc = coverUrl

  const prefersReduced = useReducedMotion()
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || prefersReduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * 16)
    rotateX.set(-(y - 0.5) * 12)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={!isTouch && !prefersReduced ? { perspective: '1000px' } : {}}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={
          !isTouch && !prefersReduced
            ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
            : {}
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink href={`/music/${item.slug}`} className="group block">
          {/* Cover */}
          <div className="relative aspect-square overflow-hidden mb-4">
            <Image
              src={coverSrc}
              alt={`${item.frontmatter.title} cover`}
              fill
              unoptimized={isRemoteUrl(coverSrc)}
              className="object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white border border-white/40 px-4 py-2">
                Listen
              </span>
            </div>
            {/* Red corner accent */}
            <div
              className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-red opacity-60 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl tracking-widest uppercase text-brand-text group-hover:text-brand-red transition-colors duration-200">
              {item.frontmatter.title}
            </h3>
            <p className="text-brand-subtle text-xs tracking-[0.15em] uppercase">
              {item.frontmatter.type && `${item.frontmatter.type} · `}{formatDateShort(item.frontmatter.date)}
            </p>
          </div>
        </NavLink>
      </motion.article>
    </div>
  )
}
