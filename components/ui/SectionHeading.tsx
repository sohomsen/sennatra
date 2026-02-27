import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  children,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display text-4xl md:text-5xl tracking-widest uppercase',
        className
      )}
    >
      {children}
      {/* Deep red underline accent */}
      <span className="block mt-3 w-12 h-px bg-brand-red" aria-hidden="true" />
    </Tag>
  )
}
