import type { Metadata } from 'next'
import { getAllShows } from '@/lib/mdx'
import { ShowsList } from '@/components/shows/ShowsList'
import { PageWrapper } from '@/components/ui/PageWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Upcoming and past shows — sennatra.',
}

export default function ShowsPage() {
  // getAllShows returns all shows sorted ascending by date (upcoming first)
  const shows = getAllShows()

  return (
    <PageWrapper>
      <main className="pt-28 pb-24 px-6 md:px-10 max-w-4xl mx-auto">
        <SectionHeading as="h1" className="mb-16">
          Shows
        </SectionHeading>
        <ShowsList shows={shows} />
      </main>
    </PageWrapper>
  )
}
