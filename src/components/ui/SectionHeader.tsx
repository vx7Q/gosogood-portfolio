import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  description?: string
  meta?: string
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  meta,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-14 md:mb-20', className)}>
      <div className="flex items-center justify-between gap-6 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">{index}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-electric shadow-[0_0_8px_#5B8CFF]" />
          <span className="eyebrow text-white/55">{label}</span>
        </div>
        {meta && <span className="mono hidden text-white/25 sm:block">{meta}</span>}
        <div className="flex items-center gap-1.5 sm:hidden" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="mt-9 grid items-end gap-6 md:mt-12 md:grid-cols-12">
        <h2
          className={cn(
            'display col-span-full text-[clamp(2.6rem,6vw,5.2rem)] text-pearl md:col-span-8',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="col-span-full max-w-sm text-[0.9rem] leading-relaxed text-mist md:col-span-4 md:justify-self-end">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
