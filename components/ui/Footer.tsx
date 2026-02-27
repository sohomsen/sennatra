import { socialLinks } from '@/lib/social'

export function Footer() {
  return (
    <footer className="border-t border-brand-muted py-8 px-6 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
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
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red">
          &copy; {new Date().getFullYear()} sennatra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
