import { NavLink } from '@/components/nav/NavLink'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 text-center">
      <p className="text-brand-red font-display text-8xl md:text-[12rem] tracking-widest leading-none select-none">
        404
      </p>
      <div className="w-12 h-px bg-brand-muted" aria-hidden="true" />
      <p className="text-brand-subtle text-xs tracking-[0.3em] uppercase">
        Page not found
      </p>
      <NavLink
        href="/"
        className="text-xs tracking-[0.2em] uppercase border border-brand-muted text-brand-subtle px-6 py-3 hover:border-brand-red hover:text-brand-text transition-colors duration-200"
      >
        Go home
      </NavLink>
    </main>
  )
}
