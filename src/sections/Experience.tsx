import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Award, Mic, Plus, Star } from 'lucide-react'
import { experience } from '@/lib/data'
import { cn, scrollToId } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'

const recognition = [
  { icon: Award, label: 'Hackathon Winner', meta: 'Build Weekend — 2022' },
  { icon: Star, label: 'Top Rated Freelancer', meta: 'Independent — 2024' },
  { icon: Mic, label: 'Guest Speaker', meta: 'Bangkok Web Meetup — 2025' },
]

export function Experience() {
  const [openEntry, setOpenEntry] = useState<number | null>(0)
  const timelineRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 78%', 'end 55%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="section-space relative">
      <div className="container-page relative z-10">
        <SectionHeader
          index="05"
          label="Experience"
          meta="THE ROAD HERE"
          title={
            <>
              <span className="block">
                <SplitText text="Built one launch" />
              </span>
              <span className="block">
                <SplitText text="at a time." wordClassName="text-gradient" delay={0.15} />
              </span>
            </>
          }
          description="No shortcuts — just a deliberate path from self-taught foundations to leading product builds end to end."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Career snapshot */}
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-6 sm:p-7">
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-electric/[0.12] blur-[50px]"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="mono text-electric/60">CAREER SNAPSHOT</span>
                  <span className="mono text-white/15">G/OS 05</span>
                </div>

                <div className="mt-7 flex items-end gap-3">
                  <span className="display text-[5.5rem] leading-[0.8] tracking-[-0.06em] text-pearl">05</span>
                  <div className="pb-1">
                    <p className="mono text-white/35">YEARS</p>
                    <p className="mono mt-1 text-white/20">IN MOTION</p>
                  </div>
                </div>

                <p className="mt-6 text-[0.84rem] leading-relaxed text-mist">
                  From a self-taught curiosity to leading end-to-end product builds for teams across
                  SaaS, commerce, and fintech.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06]">
                  {[
                    { value: '14', label: 'Products led' },
                    { value: '9', label: 'Industries' },
                    { value: '2M+', label: 'Events / month' },
                    { value: '100%', label: 'On-time' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0A0C13]/95 px-3.5 py-3">
                      <p className="display text-lg tracking-[-0.03em] text-pearl/85">{item.value}</p>
                      <p className="mono mt-1 text-[6.5px] text-white/[0.22]">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <p className="mono mb-3 text-white/20">RECOGNITION</p>
                  <div className="space-y-3">
                    {recognition.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/35">
                          <item.icon className="h-3 w-3" strokeWidth={1.5} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] text-white/60">{item.label}</p>
                          <p className="mono mt-0.5 text-[6.5px] text-white/20">{item.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-white/[0.07] pt-5">
                  <button
                    type="button"
                    onClick={() => scrollToId('contact')}
                    className="group flex w-full items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-white"
                  >
                    Work with me
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-white/25 group-hover:bg-white/[0.05]">
                      <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 px-2">
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
                <span className="mono text-white/20">CURRENTLY OPEN TO SELECT PROJECTS</span>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="lg:col-span-8">
            <ol ref={timelineRef} className="relative ml-1.5 space-y-5 sm:ml-3">
              <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.08]" aria-hidden="true" />
              <motion.div
                className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-electric via-violet to-violet/10"
                style={{ scaleY: lineScale }}
                aria-hidden="true"
              />

              {experience.map((item, index) => {
                const isOpen = openEntry === index
                return (
                  <li key={`${item.company}-${item.period}`} className="relative pl-6 sm:pl-9">
                    <span
                      className={cn(
                        'absolute left-0 top-6 z-10 flex h-[9px] w-[9px] -translate-x-1/2 items-center justify-center rounded-full border',
                        item.current
                          ? 'border-electric/60 bg-electric/40 shadow-[0_0_14px_rgba(91,140,255,0.7)]'
                          : 'border-white/25 bg-ink',
                      )}
                      aria-hidden="true"
                    >
                      {item.current && <span className="absolute inset-0 animate-ping rounded-full bg-electric/40" />}
                    </span>

                    <Reveal delay={0.03}>
                      <div
                        className={cn(
                          'group rounded-2xl border p-5 transition-all duration-500 sm:p-6',
                          item.current
                            ? 'border-electric/[0.16] bg-gradient-to-br from-electric/[0.055] via-[#0A0C13]/80 to-transparent'
                            : 'border-white/[0.07] bg-white/[0.015] hover:border-white/[0.13] hover:bg-white/[0.03]',
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-electric/70">
                              {item.period}
                            </span>
                            {item.current && (
                              <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-2 py-0.5">
                                <span className="h-1 w-1 rounded-full bg-emerald-300" />
                                <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-emerald-200/60">
                                  Now
                                </span>
                              </span>
                            )}
                          </div>
                          <span className="mono text-[7px] text-white/20">
                            {item.type} · {item.location}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="display text-[1.4rem] tracking-[-0.025em] text-pearl">{item.role}</h3>
                          <span className="text-[11px] text-white/35">{item.company}</span>
                        </div>

                        <p className="mt-3 max-w-2xl text-[0.8rem] leading-relaxed text-mist">{item.description}</p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[7px] text-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 border-t border-white/[0.06] pt-3.5">
                          <button
                            type="button"
                            onClick={() => setOpenEntry(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between text-[9px] uppercase tracking-[0.14em] text-white/30 transition-colors hover:text-white/70"
                          >
                            <span>{item.achievements.length} highlights</span>
                            <span
                              className={cn(
                                'flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] transition-all duration-300',
                                isOpen && 'rotate-45 border-electric/30 bg-electric/10 text-electric',
                              )}
                            >
                              <Plus className="h-2.5 w-2.5" strokeWidth={1.75} />
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-2.5 pt-4">
                                  {item.achievements.map((achievement) => (
                                    <li key={achievement} className="flex gap-2.5 text-[11px] leading-relaxed text-white/45">
                                      <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-electric/60" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
