import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { MusicDoc, ShowDoc, MusicFrontmatter, ShowFrontmatter } from './types'

const musicDir = path.join(process.cwd(), 'content/music')
const showsDir = path.join(process.cwd(), 'content/shows')

function readMdxDir(dir: string) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

export function getAllMusic(): MusicDoc[] {
  return readMdxDir(musicDir)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(musicDir, filename), 'utf-8')
      const { data, content } = matter(raw)
      const slug = filename.replace(/\.mdx$/, '')
      return {
        slug,
        frontmatter: data as MusicFrontmatter,
        content,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getMusicBySlug(slug: string): MusicDoc | null {
  const filePath = path.join(musicDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as MusicFrontmatter,
    content,
  }
}

export function getAllMusicSlugs(): string[] {
  return readMdxDir(musicDir).map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllShows(): ShowDoc[] {
  return readMdxDir(showsDir)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(showsDir, filename), 'utf-8')
      const { data, content } = matter(raw)
      const slug = filename.replace(/\.mdx$/, '')
      return {
        slug,
        frontmatter: data as ShowFrontmatter,
        content,
      }
    })
    .sort(
      (a, b) =>
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime()
    )
}

export function getUpcomingShows(): ShowDoc[] {
  const now = new Date()
  return getAllShows().filter(
    (s) => new Date(s.frontmatter.date) >= now
  )
}
