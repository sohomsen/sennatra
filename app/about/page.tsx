import type { Metadata } from 'next'
import { PageWrapper } from '@/components/ui/PageWrapper'
import { AboutHero } from '@/components/about/AboutHero'
import { BioParagraphs } from '@/components/about/BioParagraphs'

export const metadata: Metadata = {
  title: 'About',
  description:
    'sennatra — electronic artist working in dark ambient, industrial, and experimental sound.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <main className="pt-[60px] md:grid md:grid-cols-2">
        <AboutHero />
        <BioParagraphs />
      </main>
    </PageWrapper>
  )
}
