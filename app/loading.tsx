export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-brand-black"
      aria-label="Loading"
    >
      <div
        className="w-7 h-7 border border-brand-red border-t-transparent rounded-full animate-spin"
        role="status"
      />
    </div>
  )
}
