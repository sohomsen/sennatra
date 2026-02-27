'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { NavLink } from './NavLink'
import { socialLinks } from '@/lib/social'
import { useTransitionContext } from '@/components/transition/TransitionProvider'

// ─── Nav items ───────────────────────────────────────────────────────────────
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/shows', label: 'Shows' },
]

// ─── Framer Motion variants ────────────────────────────────────────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// ─── Component ────────────────────────────────────────────────────────────────
interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const { triggerTransition } = useTransitionContext()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9997] md:hidden flex flex-col"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {/* Ambient red glow — expands as menu opens */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(128,0,0,0.22) 0%, transparent 65%)',
            }}
            aria-hidden="true"
          />

          {/* Header row: home logo (left) + close button (right) */}
          <div className="relative z-10 flex items-center justify-between px-6 h-[60px] shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                  className="w-[90px] h-auto"
                />
              </button>
            </motion.div>

            <motion.button
              onClick={onClose}
              aria-label="Close navigation menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 flex items-center justify-center text-brand-text hover:text-brand-red transition-colors duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="3" y1="3" x2="17" y2="17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="17" y1="3" x2="3" y2="17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </div>

          {/* Navigation items — vertically centered in remaining space */}
          <nav
            className="relative z-10 flex-1 flex flex-col justify-center px-8 gap-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="[&_a]:!border-b-0 [&_a]:!pb-0"
              >
                <NavLink
                  href={item.href}
                  className="font-display text-5xl tracking-[0.04em] uppercase py-2 block leading-none hover:text-brand-red"
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Footer: social icons + copyright */}
          <motion.div
            className="relative z-10 px-8 pb-10 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {/* Social icon row */}
            <div className="flex items-center gap-5 mb-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-brand-subtle hover:text-brand-red transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-subtle/40">
              &copy; {new Date().getFullYear()} sennatra. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
