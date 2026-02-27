import { ReleaseCard } from './ReleaseCard'
import type { MusicDoc } from '@/lib/types'

interface ReleaseGridProps {
  items: MusicDoc[]
  coverMap: Record<string, string>
}

export function ReleaseGrid({ items, coverMap }: ReleaseGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-brand-subtle text-sm tracking-widest uppercase text-center py-20">
        No releases yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {items.map((item, i) => (
        <ReleaseCard
          key={item.slug}
          item={item}
          index={i}
          coverUrl={coverMap[item.slug] ?? '/images/placeholder.svg'}
        />
      ))}
    </div>
  )
}
