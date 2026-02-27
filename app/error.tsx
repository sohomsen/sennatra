'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 text-center">
      <p className="text-brand-subtle text-xs tracking-[0.2em] uppercase">Something went wrong</p>
      <h2 className="font-display text-4xl tracking-widest uppercase text-brand-text">
        Error
      </h2>
      <button
        onClick={reset}
        className="text-xs tracking-[0.2em] uppercase border border-brand-muted text-brand-subtle px-6 py-3 hover:border-brand-red hover:text-brand-text transition-colors duration-200"
      >
        Try again
      </button>
    </main>
  )
}
