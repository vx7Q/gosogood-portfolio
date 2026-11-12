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
    <div className={cn('relative', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-pearl/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="mono text-pearl/45">{index}</span>
          <span className="h-1 w-1 rounded-full bg-electric shadow-[0_0_8px_#6E8BFF]" />
          <span className="mono text-pearl/45">{label}</span>
        </div>
        <span className="mono hidden text-right text-pearl/20 sm:block">{meta}</span>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-8">
          <h2 className="display text-balance text-[clamp(2.6rem,5.6vw,5.1rem)] leading-[0.94] tracking-[-0.045em] text-pearl">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:pb-2">
          <p className="max-w-md text-pretty text-[0.9rem] leading-[1.7] text-mist">{description}</p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-7 -z-10 hidden select-none font-display text-[9rem] font-medium leading-none tracking-[-0.09em] text-pearl/[0.025] lg:block"
      >
        {index}
      </span>
    </div>
  )
}
