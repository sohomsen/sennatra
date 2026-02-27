import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface RedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'outline' | 'filled'
  as?: 'button' | 'span'
}

export function RedButton({
  children,
  variant = 'outline',
  as: Tag = 'button',
  className,
  ...props
}: RedButtonProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer active:scale-[0.97]',
        variant === 'outline' && [
          'border border-brand-red text-brand-text',
          'hover:bg-brand-red hover:text-white hover:shadow-[0_0_16px_rgba(128,0,0,0.35)] hover:brightness-110',
        ],
        variant === 'filled' && [
          'bg-brand-red text-white',
          'hover:bg-brand-red-light hover:brightness-110',
        ],
        className
      )}
      {...(props as any)}
    >
      {children}
    </Tag>
  )
}
