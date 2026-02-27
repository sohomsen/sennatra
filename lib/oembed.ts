const PLACEHOLDER = '/images/placeholder.svg'

// Module-level cache: persists for the lifetime of the Node.js process.
// In dev mode this means instant results on repeated page loads after the first fetch.
const coverCache = new Map<string, string>()

/**
 * Fetch the cover art thumbnail for a release via the platform's oEmbed endpoint.
 * Results are cached in memory for fast repeated access in dev mode.
 * Runs server-side only (called from Server Components at build time).
 * Falls back to `fallback` (legacy coverImage field) then to the placeholder SVG.
 */
export async function getReleaseCover(
  embedUrl: string,
  fallback?: string,
): Promise<string> {
  const cached = coverCache.get(embedUrl)
  if (cached !== undefined) return cached

  const result = await fetchCover(embedUrl, fallback)
  coverCache.set(embedUrl, result)
  return result
}

async function fetchCover(embedUrl: string, fallback?: string): Promise<string> {
  try {
    const u = new URL(embedUrl)
    const host = u.hostname.replace(/^www\./, '')
    let endpoint: string

    if (host === 'soundcloud.com') {
      endpoint = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(embedUrl)}`
    } else if (host === 'w.soundcloud.com') {
      const trackUrl = u.searchParams.get('url') ?? embedUrl
      endpoint = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`
    } else if (host === 'open.spotify.com') {
      const regularUrl = embedUrl.replace('/embed/', '/')
      endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(regularUrl)}`
    } else if (host === 'youtube.com' || host === 'youtu.be') {
      endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(embedUrl)}`
    } else if (host === 'music.apple.com' || host === 'embed.music.apple.com') {
      endpoint = `https://music.apple.com/oembed?url=${encodeURIComponent(embedUrl)}`
    } else {
      return fallback ?? PLACEHOLDER
    }

    // 3-second hard timeout — prevents slow/broken endpoints from blocking the page
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      const res = await fetch(endpoint, {
        signal: controller.signal,
        next: { revalidate: 86400 },
      })
      if (!res.ok) return fallback ?? PLACEHOLDER

      const data = (await res.json()) as { thumbnail_url?: string }
      let thumb = data.thumbnail_url ?? ''
      if (!thumb) return fallback ?? PLACEHOLDER

      // SoundCloud default thumbnails are 100×100 (-large); upgrade to 500×500 when possible
      if (host === 'soundcloud.com' || host === 'w.soundcloud.com') {
        thumb = thumb.replace(/-large\./, '-t500x500.')
      }

      // YouTube oEmbed returns hqdefault.jpg (480×360, letterboxed 4:3).
      // maxresdefault.jpg is 1280×720 true 16:9 with no black bars.
      if (host === 'youtube.com' || host === 'youtu.be') {
        thumb = thumb.replace(/hqdefault\.jpg/, 'maxresdefault.jpg')
      }

      return thumb
    } finally {
      clearTimeout(timeoutId)
    }
  } catch {
    return fallback ?? PLACEHOLDER
  }
}
