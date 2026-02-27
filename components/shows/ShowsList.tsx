import { ShowCard } from './ShowCard'
import type { ShowDoc } from '@/lib/types'

export function ShowsList({ shows }: { shows: ShowDoc[] }) {
  if (shows.length === 0) {
    return (
      <p className="text-brand-subtle text-sm tracking-widest uppercase text-center py-20">
        No upcoming shows. Check back soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {shows.map((show, i) => (
        <ShowCard key={show.slug} show={show} index={i} />
      ))}
    </div>
  )
}
