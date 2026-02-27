import { formatDate, getEmbedUrl } from '@/lib/utils'
import { PlatformLinks } from './PlatformLinks'
import type { MusicDoc } from '@/lib/types'

interface ReleaseDetailProps {
  item: MusicDoc
  mdxContent: React.ReactNode
  coverUrl: string
}

function detectPlatform(raw: string): 'youtube' | 'soundcloud' | 'spotify' | 'applemusic' | 'other' {
  try {
    const host = new URL(raw).hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'youtu.be') return 'youtube'
    if (host === 'soundcloud.com' || host === 'w.soundcloud.com') return 'soundcloud'
    if (host === 'open.spotify.com') return 'spotify'
    if (host === 'music.apple.com' || host === 'embed.music.apple.com') return 'applemusic'
    return 'other'
  } catch {
    return 'other'
  }
}

const EMBED_HEIGHTS: Record<string, number> = {
  soundcloud: 166,
  spotify: 352,
  applemusic: 450,
  other: 200,
}

export function ReleaseDetail({ item, mdxContent, coverUrl }: ReleaseDetailProps) {
  const platform = item.frontmatter.embedUrl ? detectPlatform(item.frontmatter.embedUrl) : null
  const embedSrc = item.frontmatter.embedUrl ? getEmbedUrl(item.frontmatter.embedUrl) : null

  return (
    <article className="pt-28 pb-24 px-6 md:px-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-10">
        {/* Cover — plain <img> to support any remote domain */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={coverUrl}
            alt={`${item.frontmatter.title} cover`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4 pt-2">
          <p className="text-brand-subtle text-xs tracking-[0.2em] uppercase">
            {item.frontmatter.type && `${item.frontmatter.type} · `}{formatDate(item.frontmatter.date)}
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-widest uppercase text-brand-text leading-tight text-balance">
            {item.frontmatter.title}
          </h1>
        </div>
      </div>

      {/* Embed player — full width, sized per platform */}
      {embedSrc && platform && (
        platform === 'youtube' ? (
          <div className="relative aspect-video w-full mb-12">
            <iframe
              src={embedSrc}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={`${item.frontmatter.title} video`}
            />
          </div>
        ) : (
          <div className="mb-12 bg-brand-black">
            <iframe
              src={embedSrc}
              width="100%"
              height={EMBED_HEIGHTS[platform] ?? 200}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="border-0 w-full block rounded-xl"
              title={`${item.frontmatter.title} player`}
            />
          </div>
        )
      )}

      {/* MDX body (if any) */}
      {mdxContent && (
        <div className="prose prose-invert prose-sm max-w-none border-t border-brand-muted pt-12">
          {mdxContent}
        </div>
      )}

      {/* Out on these platforms */}
      <PlatformLinks platformLinks={item.frontmatter.platformLinks} />
    </article>
  )
}
