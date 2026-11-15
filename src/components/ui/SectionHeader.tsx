import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  index: string
  label: string
  meta: string
  title: ReactNode
  description: string
  className?: string
}

export function SectionHeader({ index, label, meta, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('relative border-t-2 border-pearl pt-3', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-pearl/[0.16] pb-3">
        <div className="flex items-center gap-3">
          <span className="mono text-pearl/70">{index}</span>
          <span className="h-1.5 w-1.5 bg-electric" />
          <span className="mono text-pearl/70">{label}</span>
        </div>
        <span className="mono hidden text-right text-pearl/45 sm:block">{meta}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <h2 className="display text-balance text-[clamp(2.7rem,5.6vw,5.4rem)] leading-[0.94] tracking-[-0.045em] text-pearl">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:pb-1">
          <p className="max-w-md text-pretty text-[1.06rem] leading-[1.7] text-mist">{description}</p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-16 -z-10 hidden select-none font-display text-[10rem] font-medium leading-none tracking-[-0.09em] text-pearl/[0.035] lg:block"
      >
        {index}
      </span>
    </div>
  )
}
