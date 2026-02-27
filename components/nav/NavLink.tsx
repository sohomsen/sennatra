'use client'

import { usePathname } from 'next/navigation'
import { useTransitionContext } from '@/components/transition/TransitionProvider'
import type { ReactNode, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const { triggerTransition } = useTransitionContext()
  // Active state derived from usePathname() — never from click state.
  // This prevents desync when the WebGL overlay is covering the screen mid-transition.
  const pathname = usePathname()
  const isActive = pathname === href

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) return // already here, no-op
    e.preventDefault()
    // Starts WebGL sweep-in; router.push fires only when state = 'covered'
    triggerTransition(href)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'transition-all duration-300',
        isActive
          ? 'text-brand-red border-b border-brand-red pb-0.5'
          : 'text-brand-text hover:text-brand-red',
        className
      )}
    >
      {children}
    </a>
  )
}
