import { useId } from 'react'
import { cn } from '@/lib/utils'

export function LogoMark({ className, size = 30 }: { className?: string; size?: number }) {
  const rawId = useId()
  const gradientId = `logo-${rawId.replace(/:/g, '')}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="3" y1="3" x2="37" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FA2FF" />
          <stop offset="1" stopColor="#B58CFF" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="12.5" stroke={`url(#${gradientId})`} strokeWidth="1.1" opacity="0.55" />
      <ellipse
        cx="20"
        cy="20"
        rx="16.5"
        ry="6.8"
        transform="rotate(-32 20 20)"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.1"
        opacity="0.9"
      />
      <circle cx="20" cy="20" r="4" fill={`url(#${gradientId})`} />
      <circle cx="31.5" cy="10.5" r="1.4" fill="#F4F6FF" />
    </svg>
  )
}

export function Logo({ className, markSize = 30 }: { className?: string; markSize?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={markSize} />
      <span className="display text-[1.05rem] font-semibold uppercase tracking-[-0.035em] text-pearl">
        GOSOGOOD
        <span className="ml-0.5 align-super font-sans text-[7px] font-normal tracking-normal text-mist">®</span>
      </span>
    </span>
  )
}
