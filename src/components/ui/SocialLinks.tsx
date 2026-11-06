import { Mail } from 'lucide-react'
import { site } from '@/lib/data'
import { cn, publicAsset } from '@/lib/utils'
import { useClipboard } from '@/hooks/useClipboard'
import { Toast } from './Toast'

const iconLinks = [
  { label: 'GitHub', href: site.github, icon: '/social/github.svg' },
  { label: 'X / Twitter', href: 'https://x.com/gosogood', icon: '/social/x.svg' },
  { label: 'Email', href: `mailto:${site.email}`, icon: null },
]

interface SocialLinksProps {
  className?: string
  iconClassName?: string
  showLabels?: boolean
}

export function SocialLinks({ className, iconClassName, showLabels = false }: SocialLinksProps) {
  const { copied, copy } = useClipboard()

  return (
    <>
      <div className={cn('flex items-center gap-2.5', className)}>
        {iconLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            className={cn(
              'group inline-flex items-center gap-2 rounded-full text-white/40 transition-colors duration-300 hover:text-white',
              showLabels &&
                'border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] uppercase tracking-[0.16em] hover:border-white/20 hover:bg-white/[0.05]',
              iconClassName,
            )}
          >
            {link.icon ? (
              <img
                src={publicAsset(link.icon)}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100"
              />
            ) : (
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            {showLabels && <span>{link.label}</span>}
          </a>
        ))}

        <button
          type="button"
          onClick={() => copy(site.discord)}
          aria-label="Copy Discord handle"
          className={cn(
            'group inline-flex items-center gap-2 rounded-full text-white/40 transition-colors duration-300 hover:text-white',
            showLabels &&
              'border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] uppercase tracking-[0.16em] hover:border-white/20 hover:bg-white/[0.05]',
            iconClassName,
          )}
        >
          <img
            src={publicAsset('social/discord.svg')}
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5 opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100"
          />
          {showLabels && <span>Discord</span>}
        </button>
      </div>
      <Toast show={copied} message="Discord handle copied" />
    </>
  )
}
