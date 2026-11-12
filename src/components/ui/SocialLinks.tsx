import { Github, Instagram, Mail, MessageCircle } from 'lucide-react'
import { socials } from '@/lib/data'
import { cn } from '@/lib/utils'

interface SocialLinksProps {
  className?: string
  iconClassName?: string
  showLabels?: boolean
}

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const icons = {
  github: Github,
  instagram: Instagram,
  x: XMark,
  discord: MessageCircle,
  mail: Mail,
} as const

export function SocialLinks({ className, iconClassName, showLabels = false }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {socials.map((social) => {
        const Icon = icons[social.icon]
        const isExternal = ['github', 'instagram', 'x'].includes(social.icon)
        return (
          <a
            key={social.label}
            href={social.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            aria-label={social.label}
            className={cn(
              'group inline-flex items-center gap-2 text-pearl/45 transition-colors duration-300 hover:text-pearl',
              showLabels
                ? 'rounded-full border border-pearl/[0.09] bg-pearl/[0.02] px-3 py-2 text-[9px] uppercase tracking-[0.1em]'
                : 'h-8 w-8 justify-center rounded-full hover:bg-pearl/[0.06]',
              iconClassName,
            )}
          >
            <Icon className={cn(showLabels ? 'h-3 w-3' : 'h-4 w-4')} strokeWidth={1.6} />
            {showLabels && <span>{social.label}</span>}
          </a>
        )
      })}
    </div>
  )
}
