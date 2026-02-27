import type { Metadata } from 'next'
import { getAllMusic } from '@/lib/mdx'
import { getReleaseCover } from '@/lib/oembed'
import { ReleaseGrid } from '@/components/music/ReleaseGrid'
import { PageWrapper } from '@/components/ui/PageWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Releases and discography — sennatra.',
}

export default async function MusicPage() {
  const releases = getAllMusic()

  // Fetch all oEmbed covers at build time in parallel
  const coverUrls = await Promise.all(
    releases.map((r) => getReleaseCover(r.frontmatter.embedUrl, r.frontmatter.coverImage))
  )
  const coverMap: Record<string, string> = Object.fromEntries(
    releases.map((r, i) => [r.slug, coverUrls[i]])
  )

  return (
    <PageWrapper>
      <main className="pt-28 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
        <SectionHeading as="h1" className="mb-16">
          Music
        </SectionHeading>
        <ReleaseGrid items={releases} coverMap={coverMap} />
      </main>
    </PageWrapper>
  )
}
