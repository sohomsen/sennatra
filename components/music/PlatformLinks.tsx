import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiBandcamp,
  SiTiktok,
} from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'
import type { IconType } from 'react-icons'

const KEY_ICON: Record<string, IconType> = {
  spotify:    SiSpotify,
  applemusic: SiApplemusic,
  appleMusic: SiApplemusic,
  soundcloud: SiSoundcloud,
  youtube:    SiYoutube,
  bandcamp:   SiBandcamp,
  tiktok:     SiTiktok,
}

const KEY_LABEL: Record<string, string> = {
  spotify:    'Spotify',
  applemusic: 'Apple Music',
  appleMusic: 'Apple Music',
  soundcloud: 'SoundCloud',
  youtube:    'YouTube',
  bandcamp:   'Bandcamp',
  tiktok:     'TikTok',
}

export function PlatformLinks({ platformLinks }: { platformLinks?: Record<string, string> }) {
  if (!platformLinks) return null
  const entries = Object.entries(platformLinks).filter(([, url]) => !!url)
  if (!entries.length) return null

  return (
    <div className="mt-10 pt-10 border-t border-brand-muted">
      <p className="text-[10px] tracking-[0.25em] uppercase text-brand-subtle mb-5">
        Out on these platforms
      </p>
      <div className="flex flex-wrap items-center gap-6">
        {entries.map(([key, url]) => {
          const Icon = KEY_ICON[key] ?? FiExternalLink
          const label = KEY_LABEL[key] ?? key
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-brand-subtle hover:text-brand-red transition-colors duration-200"
            >
              <Icon size={22} aria-hidden="true" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
