import type { Metadata } from 'next'
import { getAllMusic, getUpcomingShows } from '@/lib/mdx'
import { getReleaseCover } from '@/lib/oembed'
import { getHomeContent } from '@/lib/home'
import HeroSection from '@/components/home/HeroSection'
import FeaturedRelease from '@/components/home/FeaturedRelease'
import NextShowTeaser from '@/components/home/NextShowTeaser'
import AboutSnippet from '@/components/home/AboutSnippet'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { FloatingFooter } from '@/components/home/FloatingFooter'

export function generateMetadata(): Metadata {
  const home = getHomeContent()
  return {
    title: home.seoTitle,
    description: home.seoDescription,
  }
}

export default async function HomePage() {
  const home = getHomeContent()
  const allMusic = getAllMusic()
  const upcomingShows = getUpcomingShows()
  const featuredRelease = allMusic[0] ?? null
  const nextShow = upcomingShows[0] ?? null

  const featuredCoverUrl = featuredRelease
    ? await getReleaseCover(featuredRelease.frontmatter.embedUrl, featuredRelease.frontmatter.coverImage)
    : null

  return (
    <main>
      <ScrollProgress />
      <HeroSection
        tagline={home.heroTagline}
        subline={home.heroSubline}
        ctaLabel={home.ctaText}
        ctaHref={home.ctaHref}
      />
      {featuredRelease && featuredCoverUrl && (
        <FeaturedRelease
          item={featuredRelease}
          coverUrl={featuredCoverUrl}
          heading={home.featuredReleaseHeading}
          blurb={home.featuredReleaseBlurb}
        />
      )}
      {nextShow && (
        <NextShowTeaser
          show={nextShow}
          heading={home.nextShowHeading}
          blurb={home.nextShowBlurb}
        />
      )}
      <AboutSnippet
        heading={home.aboutSnippetHeading}
        bioSnippet={home.aboutSnippetBlurb}
      />
      <FloatingFooter />
    </main>
  )
}
