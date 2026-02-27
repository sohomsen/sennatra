'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Connect Lenis scroll events to GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP's ticker to avoid double RAF loops
    const rafFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger once after mount
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(rafFn)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top immediately on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    // Refresh ScrollTrigger after new page content mounts
    const id = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(id)
  }, [pathname])

  return <>{children}</>
}
