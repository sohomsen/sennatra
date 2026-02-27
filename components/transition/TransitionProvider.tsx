'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'

export type TransitionState =
  | 'idle'
  | 'sweeping-in'
  | 'covered'
  | 'sweeping-out'

interface TransitionContextValue {
  transitionState: TransitionState
  triggerTransition: (href: string) => void
  onSweepInComplete: () => void
  onSweepOutComplete: () => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function useTransitionContext() {
  const ctx = useContext(TransitionContext)
  if (!ctx)
    throw new Error(
      'useTransitionContext must be used within TransitionProvider'
    )
  return ctx
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [transitionState, setTransitionState] =
    useState<TransitionState>('idle')
  const router = useRouter()
  const pendingHref = useRef<string | null>(null)
  const prefersReduced = useReducedMotion()

  const triggerTransition = useCallback(
    (href: string) => {
      if (transitionState !== 'idle') return

      if (prefersReduced) {
        // No WebGL for reduced-motion — navigate instantly
        router.push(href)
        return
      }

      pendingHref.current = href
      setTransitionState('sweeping-in')
    },
    [transitionState, router, prefersReduced]
  )

  // Called by SweepMesh when sweep-in animation finishes
  const onSweepInComplete = useCallback(() => {
    const href = pendingHref.current
    if (!href) return
    setTransitionState('covered')
    router.push(href)
    // Brief settle for Next.js RSC hydration before sweeping out
    setTimeout(() => {
      setTransitionState('sweeping-out')
    }, 80)
  }, [router])

  // Called by SweepMesh when sweep-out animation finishes
  const onSweepOutComplete = useCallback(() => {
    setTransitionState('idle')
    pendingHref.current = null
  }, [])

  return (
    <TransitionContext.Provider
      value={{
        transitionState,
        triggerTransition,
        onSweepInComplete,
        onSweepOutComplete,
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}
