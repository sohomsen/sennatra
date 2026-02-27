'use client'

import { motion } from 'framer-motion'
import { formatDate, isUpcoming } from '@/lib/utils'
import type { ShowDoc } from '@/lib/types'

export function ShowCard({ show, index }: { show: ShowDoc; index: number }) {
  const upcoming = isUpcoming(show.frontmatter.date)

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-brand-muted group ${
        !upcoming ? 'opacity-40' : ''
      }`}
    >
      <div className="flex flex-col gap-1.5">
        {/* Date */}
        <p className="font-display text-2xl md:text-3xl tracking-widest uppercase text-brand-text group-hover:text-brand-red transition-colors duration-200">
          {formatDate(show.frontmatter.date)}
        </p>
        {/* Venue + City */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-brand-subtle">
          <span className="tracking-wide">{show.frontmatter.venue}</span>
          <span className="text-brand-muted" aria-hidden="true">·</span>
          <span className="tracking-widest uppercase text-xs">{show.frontmatter.city}</span>
        </div>
        {show.frontmatter.notes && (
          <p className="text-brand-subtle/60 text-xs tracking-wide mt-0.5">
            {show.frontmatter.notes}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        {!upcoming && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-subtle/50 border border-brand-muted/40 px-2 py-1">
            Past
          </span>
        )}
        {upcoming && show.frontmatter.ticketUrl && (
          <a
            href={show.frontmatter.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase border border-brand-red text-brand-text px-4 py-2 hover:bg-brand-red hover:text-white transition-all duration-300"
          >
            Tickets
          </a>
        )}
        {upcoming && !show.frontmatter.ticketUrl && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-subtle border border-brand-muted/40 px-2 py-1">
            Coming soon
          </span>
        )}
      </div>
    </motion.article>
  )
}
