export interface MusicFrontmatter {
  title: string
  date: string // ISO date string e.g. "2025-01-15"
  type?: 'Single' | 'EP' | 'Album' | string
  embedUrl: string
  platformLinks?: Record<string, string> // e.g. { spotify: "...", soundcloud: "..." }
  // Legacy fields — kept so old MDX files don't crash; silently ignored in UI
  platform?: string
  tags?: string[]
  coverImage?: string // used as oEmbed fallback if auto-fetch fails
}

export interface ShowFrontmatter {
  date: string // ISO date string e.g. "2025-03-15"
  city: string
  venue: string
  ticketUrl?: string
  notes?: string
}

export interface MusicDoc {
  slug: string
  frontmatter: MusicFrontmatter
  content: string // raw MDX body (without frontmatter)
}

export interface ShowDoc {
  slug: string
  frontmatter: ShowFrontmatter
  content: string
}
