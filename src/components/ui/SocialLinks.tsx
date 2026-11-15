import { Github, Instagram, Mail, MessageCircle } from 'lucide-react'
import { socials } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface SocialLinksProps {
  className?: string
  iconClassName?: string
  showLabels?: boolean
  inverse?: boolean
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

export function SocialLinks({ className, iconClassName, showLabels = false, inverse = false }: SocialLinksProps) {
  const { copy } = useI18n()

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {socials.map((social) => {
        const Icon = icons[social.icon]
        const isExternal = ['github', 'instagram', 'x'].includes(social.icon)
        const label = social.icon === 'mail' ? copy.common.email : social.label
        return (
          <a
            key={social.label}
            href={social.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            aria-label={label}
            className={cn(
              'group inline-flex items-center gap-2 transition-colors duration-300',
              inverse
                ? 'text-white/65 hover:text-white'
                : 'text-pearl/50 hover:text-pearl',
              showLabels
                ? cn(
                    'rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.06em]',
                    inverse ? 'border-white/25 bg-white/10' : 'border-pearl/[0.14] bg-panel',
                  )
                : cn(
                    'h-8 w-8 justify-center rounded-full',
                    inverse ? 'hover:bg-white/10' : 'hover:bg-pearl/[0.06]',
                  ),
              iconClassName,
            )}
          >
            <Icon className={cn(showLabels ? 'h-3 w-3' : 'h-4 w-4')} strokeWidth={1.6} />
            {showLabels && <span>{label}</span>}
          </a>
        )
      })}
    </div>
  )
}
