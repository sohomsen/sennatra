'use client'

// This wrapper exists solely to satisfy Next.js 15+ rule:
// `dynamic(..., { ssr: false })` must live inside a 'use client' component.
// The root layout (Server Component) imports this instead of TransitionCanvas directly.

import dynamic from 'next/dynamic'

const TransitionCanvas = dynamic(
  () => import('./TransitionCanvas'),
  { ssr: false }
)

export default function TransitionCanvasLoader() {
  return <TransitionCanvas />
}
