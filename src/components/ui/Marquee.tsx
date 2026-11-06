import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Asterisk } from 'lucide-react'

interface MarqueeProps {
  items: string[]
  className?: string
  duration?: number
  itemClassName?: string
  separator?: ReactNode
  reverse?: boolean
}

export function Marquee({
  items,
  className,
  duration = 38,
  itemClassName,
  separator,
  reverse = false,
}: MarqueeProps) {
  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${key}-${item}-${index}`} className="flex items-center">
          <span
            className={cn(
              'display whitespace-nowrap px-6 text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium uppercase tracking-[-0.02em] text-white/35 md:px-8',
              itemClassName,
            )}
          >
            {item}
          </span>
          <span className="text-electric/50">
            {separator ?? <Asterisk className="h-3 w-3" strokeWidth={1.25} />}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={cn('relative flex w-full overflow-hidden', className)}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
    >
      <div
        className="marquee-track items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {group('a')}
        {group('b')}
        {group('c')}
        {group('d')}
      </div>
    </div>
  )
}
