'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!barRef.current) return
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-red origin-left scale-x-0"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  )
}
