'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true when the #home-hero section is intersecting the viewport.
 * On non-home pages always returns false (hero never in view → corner logo always visible).
 * Initial state on the home page is `true` to avoid a flash of the corner logo on load.
 */
export function useHeroInView(isHomePage: boolean): boolean {
  const [inView, setInView] = useState(isHomePage)

  useEffect(() => {
    if (!isHomePage) {
      setInView(false)
      return
    }
    const hero = document.getElementById('home-hero')
    if (!hero) {
      setInView(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5] }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHomePage])

  return inView
}
