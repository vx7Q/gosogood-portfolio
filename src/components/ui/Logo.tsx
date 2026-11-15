import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

export function Logo({ className, markClassName, wordmarkClassName }: LogoProps) {
  const { copy } = useI18n()

  return (
    <a
      href="#home"
      className={cn('group flex items-center gap-2.5', className)}
      aria-label={copy.common.logoAria}
    >
      <span
        className={cn(
          'relative flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-500 group-hover:rotate-12',
          markClassName,
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-[3px] rounded-full border border-electric/60" />
        <span className="absolute inset-[9px] rounded-full border border-electric/40" />
        <span className="absolute inset-[-2px] rotate-[-28deg] rounded-[50%] border border-pearl/20" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-electric" />
        <span className="absolute right-1 top-1.5 h-0.5 w-0.5 rounded-full bg-pearl" />
      </span>
      <span
        className={cn(
          'font-display text-[17px] font-semibold tracking-[-0.035em] text-pearl',
          wordmarkClassName,
        )}
      >
        <span className="text-electric">_</span>gosogood
      </span>
    </a>
  )
}
