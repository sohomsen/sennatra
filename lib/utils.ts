import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Parse a YYYY-MM-DD date string as local midnight (avoids UTC timezone shift).
function parseDateLocal(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(dateString: string): string {
  return parseDateLocal(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateString: string): string {
  return parseDateLocal(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function isUpcoming(dateString: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parseDateLocal(dateString) >= today
}

// Transform a plain track/watch URL into the correct embed player URL.
// Supports SoundCloud, Spotify, YouTube, and Apple Music.
// Already-correct embed URLs and unsupported platforms pass through unchanged.
export function getEmbedUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'soundcloud.com') {
      const params = new URLSearchParams({
        url: rawUrl,
        auto_play: 'false',
        hide_related: 'false',
        show_comments: 'false',
        show_user: 'true',
        show_reposts: 'false',
        show_teaser: 'true',
      })
      return `https://w.soundcloud.com/player/?${params.toString()}`
    }

    if (host === 'open.spotify.com' && !u.pathname.startsWith('/embed')) {
      return `https://open.spotify.com/embed${u.pathname}${u.search}`
    }

    if (host === 'youtube.com' && u.pathname === '/watch') {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    if (host === 'music.apple.com') {
      return rawUrl.replace('music.apple.com', 'embed.music.apple.com')
    }

    return rawUrl
  } catch {
    return rawUrl
  }
}

// Returns true for absolute http(s) URLs (remote images requiring unoptimized rendering).
export function isRemoteUrl(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://')
}
