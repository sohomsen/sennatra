'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { NavLink } from './NavLink'
import { MobileMenu } from './MobileMenu'
import { useHeroInView } from './useHeroInView'
import { useTransitionContext } from '@/components/transition/TransitionProvider'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/shows', label: 'Shows' },
]

export default function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { triggerTransition } = useTransitionContext()
  const isHomePage = pathname === '/'
  const isHomeHeroInView = useHeroInView(isHomePage)
  const showCornerLogo = !isHomePage || !isHomeHeroInView

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[9996] h-[60px] flex items-center justify-between px-6 md:px-10 transition-all duration-300',
          scrolled
            ? 'bg-brand-black/85 backdrop-blur-md border-b border-brand-muted'
            : 'bg-transparent'
        )}
      >
        {/* Left slot: corner home logo */}
        <div className="flex items-center">
          <AnimatePresence>
            {showCornerLogo && (
              <motion.div
                key="corner-logo"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => triggerTransition('/')}
                  aria-label="Go home"
                  className="block"
                >
                  <Image
                    src="/logo.svg"
                    alt="sennatra"
                    width={130}
                    height={40}
                    className="w-[100px] md:w-[120px] h-auto"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right slot: desktop nav + mobile hamburger */}
        <div className="flex items-center">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-[0.2em] uppercase hover:tracking-[0.28em]"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={cn(
                'block h-px bg-brand-text transition-transform duration-200 origin-center',
                isMobileOpen ? 'rotate-45 translate-y-[7px]' : 'w-full'
              )}
            />
            <span
              className={cn(
                'block h-px bg-brand-text transition-opacity duration-200',
                isMobileOpen ? 'opacity-0' : 'w-4/5 opacity-100'
              )}
            />
            <span
              className={cn(
                'block h-px bg-brand-text transition-transform duration-200 origin-center',
                isMobileOpen ? '-rotate-45 -translate-y-[7px]' : 'w-full'
              )}
            />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  )
}
