'use client'

import { useState, useEffect, useCallback } from 'react'
import { NavLink } from './NavLink'
import { MobileMenu } from './MobileMenu'
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
          'fixed top-0 inset-x-0 z-[9996] h-[60px] flex items-center justify-end px-6 md:px-10 transition-all duration-300',
          scrolled
            ? 'bg-brand-black/85 backdrop-blur-md border-b border-brand-muted'
            : 'bg-transparent'
        )}
      >
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
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  )
}
