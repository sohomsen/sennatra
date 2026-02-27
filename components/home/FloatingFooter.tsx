'use client'

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { socialLinks } from '@/lib/social'

export function FloatingFooter() {
  const { scrollYProgress } = useScroll()
  // Fade from fully visible at scroll 0 → fully hidden at 12% scroll
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
      aria-hidden="true"
    >
      {/* Gradient scrim for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)',
        }}
      />
      <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-6 pt-8 pointer-events-auto">
        <div className="flex items-center gap-4">
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
      </div>
    </motion.div>
  )
}
