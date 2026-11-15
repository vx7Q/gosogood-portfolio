import { ArrowUpRight, Compass } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { scrollToId } from '@/lib/scroll'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const snapshotValues = ['04', '03', '01', '02'] as const

export function Journey() {
  const { copy } = useI18n()
  const { journey, common } = copy

  return (
    <section id="journey" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="04"
            label={journey.label}
            meta={journey.meta}
            title={
              <>
                {journey.titleLead}
                <br />
                <span className="accent-serif italic tracking-[-0.03em] text-gradient">
                  {journey.titleAccent}
                </span>
              </>
            }
            description={journey.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="glass relative overflow-hidden p-6 sm:p-7 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="mono">{journey.snapshot}</span>
                <span className="mono text-pearl/45">{journey.snapshotCount}</span>
              </div>

              <p className="display mt-7 text-[5.6rem] leading-[0.8] tracking-[-0.07em] text-pearl">
                {journey.startedValue}
                <span className="text-electric">.</span>
              </p>
              <p className="mono mt-2">{journey.startedLabel}</p>

              <p className="mt-5 max-w-xs text-[0.98rem] leading-[1.75] text-mist">
                {journey.intro}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-pearl/[0.12] bg-pearl/[0.1]">
                {journey.stats.map((label, index) => (
                  <div key={label} className="bg-panel p-4">
                    <p className="display text-[1.8rem] leading-none tracking-[-0.04em] text-pearl">
                      {snapshotValues[index]}
                    </p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.04em] text-pearl/55">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 border border-electric/20 bg-electric/[0.04] p-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5 text-electric" strokeWidth={1.5} />
                  <p className="mono text-electric">{journey.nextStep}</p>
                </div>
                <p className="mt-2.5 text-[12px] leading-relaxed text-pearl/60">
                  {journey.nextStepNote}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="group mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-electric transition-colors hover:text-pearl"
                >
                  {journey.talkAnyway}
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-pearl/[0.12] pt-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                <span className="text-[11px] text-pearl/65">{common.status}</span>
              </div>
            </div>
          </Reveal>

          <div className="relative lg:col-span-8">
            <div className="relative">
              <span
                className="absolute bottom-3 left-[3px] top-3 w-px bg-gradient-to-b from-pearl/25 via-pearl/15 to-transparent"
                aria-hidden="true"
              />
              <div className="space-y-4">
                {journey.items.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.05}>
                    <div className="relative pl-8">
                      <span
                        className={cn(
                          'absolute left-0 top-7 h-1.5 w-1.5 rounded-full',
                          item.current ? 'bg-electric' : 'bg-pearl/25',
                        )}
                        aria-hidden="true"
                      />
                      <div
                        className={cn(
                          'glass p-5 transition-colors duration-500 hover:border-pearl/30 sm:p-6',
                          item.current && 'border-electric/20 bg-electric/[0.025]',
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className={cn('mono', item.current ? 'text-electric' : 'text-pearl/55')}>
                              {item.year}
                            </span>
                            {item.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-electric/25 bg-electric/[0.06] px-2 py-0.5">
                                <span className="h-1 w-1 rounded-full bg-electric" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-electric">
                                  {journey.now}
                                </span>
                              </span>
                            )}
                          </div>
                          <span className="mono text-pearl/45">{item.role}</span>
                        </div>

                        <h3 className="display mt-3 text-[1.7rem] tracking-[-0.035em] text-pearl">{item.title}</h3>
                        <p className="mt-2 max-w-2xl text-pretty text-[0.96rem] leading-[1.75] text-mist">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-pearl/[0.18] bg-panel px-2.5 py-1 text-[11px] text-pearl/65"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.08}>
              <p className="accent-serif mt-5 pl-8 text-[1.25rem] italic text-pearl/55">
                {journey.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
