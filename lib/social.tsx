import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiInstagram,
  SiTwitch,
  SiTiktok,
  SiBandcamp,
  SiGithub,
} from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import type { IconType } from "react-icons";

const HOSTNAME_ICON: Record<string, IconType> = {
  "open.spotify.com": SiSpotify,
  "spotify.com": SiSpotify,
  "music.apple.com": SiApplemusic,
  "itunes.apple.com": SiApplemusic,
  "soundcloud.com": SiSoundcloud,
  "youtube.com": SiYoutube,
  "youtu.be": SiYoutube,
  "instagram.com": SiInstagram,
  "twitch.tv": SiTwitch,
  "tiktok.com": SiTiktok,
  "bandcamp.com": SiBandcamp,
  "github.com": SiGithub,
};

const HOSTNAME_LABEL: Record<string, string> = {
  "open.spotify.com": "Spotify",
  "spotify.com": "Spotify",
  "music.apple.com": "Apple Music",
  "itunes.apple.com": "Apple Music",
  "soundcloud.com": "SoundCloud",
  "youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "instagram.com": "Instagram",
  "twitch.tv": "Twitch",
  "tiktok.com": "TikTok",
  "bandcamp.com": "Bandcamp",
  "github.com": "GitHub",
};

function inferIcon(url: string): IconType {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return HOSTNAME_ICON[hostname] ?? FiExternalLink;
  } catch {
    return FiExternalLink;
  }
}

function inferLabel(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return HOSTNAME_LABEL[hostname] ?? hostname;
  } catch {
    return url;
  }
}

// EDIT: Add, remove, or reorder URLs below.
// Icons and labels are inferred automatically from the hostname.
// Supported: Spotify, Apple Music, SoundCloud, YouTube, Instagram, Twitch, TikTok, Bandcamp, GitHub
// Any unrecognised URL gets a generic external-link icon.
export const SOCIAL_URLS: string[] = [
  "https://www.instagram.com/sennatramusic/",
  "https://www.youtube.com/channel/UCv0kMKrXDIxz3oPwxv26_Xw",
  "https://soundcloud.com/sennatramusic",
  "https://www.tiktok.com/@sennatramusic",
  "https://www.twitch.tv/sennatramusic",
  "https://open.spotify.com/artist/6RcOqrczTTaavR7ynMBLKg?si=6A9sC0cJSTah1WbEoGJYVw",
  "https://music.apple.com/us/artist/sennatra/1840705855",
  "https://github.com/sohomsen",
];

export const socialLinks = SOCIAL_URLS.map((href) => {
  const Icon = inferIcon(href);
  return {
    href,
    label: inferLabel(href),
    icon: <Icon size={20} aria-hidden="true" />,
  };
});
