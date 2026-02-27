'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NavLink } from '@/components/nav/NavLink'
import { RedButton } from '@/components/ui/RedButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDate } from '@/lib/utils'
import type { ShowDoc } from '@/lib/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function NextShowTeaser({ show, heading = 'Next Show', blurb }: { show: ShowDoc; heading?: string; blurb?: string }) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-10 border-t border-brand-muted"
      aria-label="Next show"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading className="mb-12">{heading}</SectionHeading>
        {blurb && (
          <p className="text-brand-subtle text-sm tracking-wide mb-12 -mt-8">{blurb}</p>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3">
            {/* Date */}
            <p className="font-display text-5xl md:text-7xl tracking-widest text-brand-text uppercase">
              {formatDate(show.frontmatter.date)}
            </p>
            {/* Venue details */}
            <div className="flex flex-col gap-1">
              <p className="text-brand-text text-lg tracking-wide">
                {show.frontmatter.venue}
              </p>
              <p className="text-brand-subtle text-sm tracking-widest uppercase">
                {show.frontmatter.city}
              </p>
            </div>
            {show.frontmatter.notes && (
              <p className="text-brand-subtle text-xs tracking-wide mt-1">
                {show.frontmatter.notes}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {show.frontmatter.ticketUrl ? (
              <a
                href={show.frontmatter.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RedButton as="span" variant="filled">
                  Get Tickets
                </RedButton>
              </a>
            ) : null}
            <NavLink
              href="/shows"
              className="text-xs tracking-[0.15em] uppercase text-brand-subtle hover:text-brand-red transition-colors"
            >
              All shows →
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
