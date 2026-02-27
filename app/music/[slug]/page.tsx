import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMusicBySlug, getAllMusicSlugs } from '@/lib/mdx'
import { getReleaseCover } from '@/lib/oembed'
import { ReleaseDetail } from '@/components/music/ReleaseDetail'
import { PageWrapper } from '@/components/ui/PageWrapper'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllMusicSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getMusicBySlug(slug)
  if (!doc) return { title: 'Not Found' }
  return {
    title: doc.frontmatter.title,
    description: `${doc.frontmatter.title} by sennatra`,
  }
}

export default async function ReleaseSlugPage({ params }: Props) {
  const { slug } = await params
  const doc = getMusicBySlug(slug)
  if (!doc) notFound()

  // Fetch cover art via oEmbed (server-side, happens at build time for static pages).
  // Falls back to legacy coverImage field, then to the placeholder SVG.
  const coverUrl = await getReleaseCover(
    doc.frontmatter.embedUrl,
    doc.frontmatter.coverImage,
  )

  // Render MDX body content server-side; skip if no body content
  const mdxContent = doc.content.trim() ? <MDXRemote source={doc.content} /> : null

  return (
    <PageWrapper>
      <ReleaseDetail item={doc} mdxContent={mdxContent} coverUrl={coverUrl} />
    </PageWrapper>
  )
}
