import type { ReactNode } from 'react'
import { Asterisk } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: readonly string[]
  className?: string
  itemClassName?: string
  duration?: number
  separator?: ReactNode
}

export function Marquee({ items, className, itemClassName, duration = 42, separator }: MarqueeProps) {
  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${key}-${item}-${index}`} className="flex items-center">
          <span
            className={cn(
              'display whitespace-nowrap px-7 text-[clamp(1.05rem,2.1vw,1.55rem)] font-medium uppercase tracking-[-0.02em] text-pearl/35 md:px-9',
              itemClassName,
            )}
          >
            {item}
          </span>
          <span className="text-electric/55">
            {separator ?? <Asterisk className="h-3 w-3" strokeWidth={1.2} />}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={cn('relative flex w-full overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-track items-center" style={{ animationDuration: `${duration}s` }}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}
