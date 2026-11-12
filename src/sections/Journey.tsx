import { ArrowUpRight, Compass } from 'lucide-react'
import { journey, site, snapshotStats } from '@/lib/data'
import { cn } from '@/lib/utils'
import { scrollToId } from '@/lib/scroll'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Journey() {
  return (
    <section id="journey" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="04"
            label="Journey"
            meta="THE ROAD HERE"
            title={
              <>
                Learning in public,
                <br />
                <span className="font-serif italic tracking-[-0.03em] text-gradient">one build at a time.</span>
              </>
            }
            description="No invented titles or client logos — just the honest path from a first HTML tag to shipping small projects while I study."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-7 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="mono text-pearl/25">Student snapshot</span>
                <span className="mono text-pearl/15">04 / 04</span>
              </div>

              <p className="display mt-7 text-[5.6rem] leading-[0.8] tracking-[-0.07em] text-pearl">
                M.3<span className="text-electric">.</span>
              </p>
              <p className="mono mt-2 text-pearl/25">Where it started</p>

              <p className="mt-5 max-w-xs text-[0.88rem] leading-[1.75] text-mist">
                Started with HTML and CSS in Matthayom 3. Still studying, still shipping — the projects above are
                where the lessons became real.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-pearl/[0.07] bg-pearl/[0.06]">
                {snapshotStats.map((item) => (
                  <div key={item.label} className="bg-panel p-4">
                    <p className="display text-[1.5rem] leading-none tracking-[-0.04em] text-pearl">{item.value}</p>
                    <p className="mt-1.5 text-[8px] uppercase tracking-[0.08em] text-pearl/25">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-electric/10 bg-electric/[0.025] p-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-3 w-3 text-electric-soft/60" strokeWidth={1.5} />
                  <p className="mono text-electric-soft/40">Next step</p>
                </div>
                <p className="mt-2.5 text-[10px] leading-relaxed text-pearl/35">
                  No next job — just the next build. I am not looking for work right now; I want to keep studying
                  and keep making things.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="group mt-3 inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-electric-soft/50 transition-colors hover:text-electric-soft"
                >
                  Talk anyway
                  <ArrowUpRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-pearl/[0.07] pt-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                <span className="text-[9px] text-electric-soft/55">{site.status}</span>
              </div>
            </div>
          </Reveal>

          <div className="relative lg:col-span-8">
            <div className="relative">
              <span
                className="absolute bottom-3 left-[3px] top-3 w-px bg-gradient-to-b from-pearl/15 via-pearl/10 to-transparent"
                aria-hidden="true"
              />
              <div className="space-y-4">
                {journey.map((item, index) => (
                  <Reveal key={`${item.year}-${item.title}`} delay={index * 0.05}>
                    <div className="relative pl-8">
                      <span
                        className={cn(
                          'absolute left-0 top-7 h-1.5 w-1.5 rounded-full',
                          item.current ? 'bg-electric shadow-[0_0_10px_rgba(110,139,255,0.8)]' : 'bg-pearl/25',
                        )}
                        aria-hidden="true"
                      />
                      <div
                        className={cn(
                          'glass rounded-[22px] p-5 transition-colors duration-500 hover:border-pearl/[0.14] sm:p-6',
                          item.current && 'border-electric/20 bg-electric/[0.025]',
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className={cn('mono', item.current ? 'text-electric-soft/60' : 'text-pearl/25')}>
                              {item.year}
                            </span>
                            {item.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-electric/20 bg-electric/[0.06] px-2 py-0.5">
                                <span className="h-1 w-1 rounded-full bg-electric" />
                                <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-electric-soft/65">
                                  Now
                                </span>
                              </span>
                            )}
                          </div>
                          <span className="mono text-pearl/15">{item.role}</span>
                        </div>

                        <h3 className="display mt-3 text-[1.6rem] tracking-[-0.035em] text-pearl">{item.title}</h3>
                        <p className="mt-2 max-w-2xl text-pretty text-[0.86rem] leading-[1.75] text-mist">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-pearl/[0.08] bg-pearl/[0.025] px-2.5 py-1 text-[8px] uppercase tracking-[0.08em] text-pearl/30"
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
              <p className="mt-5 pl-8 font-serif text-[1.15rem] italic text-pearl/25">
                The next entry is still being written.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
