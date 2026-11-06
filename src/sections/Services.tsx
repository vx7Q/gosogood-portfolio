import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Code2,
  Gauge,
  LayoutTemplate,
  PenTool,
  Plus,
  Server,
  Star,
} from 'lucide-react'
import { services, site } from '@/lib/data'
import { cn, scrollToId } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'

const icons = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  pen: PenTool,
  gauge: Gauge,
}

const process = [
  { index: '01', title: 'Discover', text: 'Understand the problem, the people, and what success actually means.' },
  { index: '02', title: 'Define', text: 'Shape the scope, the system, and the smallest path to real value.' },
  { index: '03', title: 'Design', text: 'Prototype the interface and pressure-test it before a line of code.' },
  { index: '04', title: 'Ship', text: 'Build, refine, launch, and stay close through the first real users.' },
]

export function Services() {
  const [openService, setOpenService] = useState<number>(0)

  return (
    <section id="services" className="section-space relative">
      <div className="container-page relative z-10">
        <SectionHeader
          index="06"
          label="Services"
          meta="WHAT I DO"
          title={
            <>
              <span className="block">
                <SplitText text="From first idea" />
              </span>
              <span className="block">
                <SplitText text="to final deploy." wordClassName="text-gradient" delay={0.15} />
              </span>
            </>
          }
          description="Focused engagements, clear outcomes. Whether you need one layer or the whole product, the standard stays the same."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <div className="border-y border-white/[0.08]">
                {services.map((service, index) => {
                  const Icon = icons[service.icon]
                  const isOpen = openService === index
                  return (
                    <div
                      key={service.title}
                      className={cn(
                        'group border-b border-white/[0.08] transition-colors duration-500 last:border-b-0',
                        isOpen && 'bg-white/[0.012]',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenService(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? `service-panel-${index}` : undefined}
                        className="flex w-full items-center gap-4 py-5 text-left sm:gap-5 sm:py-6"
                      >
                        <span className="w-6 shrink-0 font-mono text-[9px] text-white/20 transition-colors group-hover:text-electric/60 sm:w-8">
                          {service.index}
                        </span>
                        <span
                          className={cn(
                            'hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 sm:flex',
                            isOpen
                              ? 'border-electric/20 bg-electric/[0.07] text-electric'
                              : 'border-white/[0.08] bg-white/[0.025] text-white/35 group-hover:border-white/[0.15] group-hover:text-white/60',
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.4} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3
                              className={cn(
                                'display text-[1.4rem] tracking-[-0.025em] transition-colors sm:text-[1.65rem]',
                                isOpen ? 'text-pearl' : 'text-white/65 group-hover:text-pearl',
                              )}
                            >
                              {service.title}
                            </h3>
                            {isOpen && (
                              <span className="rounded-full border border-electric/20 bg-electric/[0.06] px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-electric/70">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 truncate text-[11px] text-white/30">{service.summary}</p>
                        </div>
                        <span className="mono hidden text-white/20 lg:block">{service.timeline}</span>
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                            isOpen
                              ? 'rotate-45 border-electric/30 bg-electric/10 text-electric'
                              : 'border-white/[0.1] text-white/30 group-hover:border-white/25 group-hover:text-white',
                          )}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`service-panel-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-6 pb-7 pl-10 sm:grid-cols-[1.1fr_0.9fr] sm:pl-[76px] sm:pr-8">
                              <div>
                                <p className="max-w-md text-[0.82rem] leading-relaxed text-mist">
                                  {service.description}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => scrollToId('contact')}
                                  className="group/cta mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-white"
                                >
                                  Discuss this service
                                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" strokeWidth={1.5} />
                                </button>
                              </div>
                              <div>
                                <p className="mono mb-3 text-white/20">WHAT YOU GET</p>
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  {service.deliverables.map((deliverable) => (
                                    <li key={deliverable} className="flex items-center gap-2 text-[10px] text-white/40">
                                      <span className="h-[3px] w-[3px] rounded-full bg-electric/60" />
                                      {deliverable}
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-4 flex items-center gap-2">
                                  <span className="mono text-[6.5px] text-white/15">TYPICAL TIMELINE</span>
                                  <span className="mono text-[7px] text-white/35">{service.timeline}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Process */}
            <Reveal delay={0.08}>
              <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                  <span className="mono text-white/25">THE PROCESS</span>
                  <span className="mono text-white/15">04 STEPS / NO DRAMA</span>
                </div>
                <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
                  {process.map((step) => (
                    <div key={step.index} className="group relative bg-[#090B11] p-5 transition-colors duration-500 hover:bg-[#0C0F17]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[8px] text-white/20">{step.index}</span>
                        <span className="h-1 w-1 rounded-full bg-white/15 transition-all group-hover:bg-electric group-hover:shadow-[0_0_8px_#5B8CFF]" />
                      </div>
                      <h4 className="display mt-7 text-lg tracking-[-0.02em] text-white/75">{step.title}</h4>
                      <p className="mt-2 text-[10px] leading-relaxed text-white/30">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA rail */}
          <div className="min-w-0 lg:col-span-4">
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              <Reveal delay={0.12}>
                <div className="relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-gradient-to-br from-electric/[0.14] via-[#0C0F18] to-violet/[0.12] p-6 sm:p-7">
                  <div
                    className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-violet/20 blur-[50px]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between">
                    <span className="mono text-white/30">AVAILABILITY</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-300" />
                      <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-emerald-200/60">Open</span>
                    </span>
                  </div>

                  <h3 className="display mt-8 text-[1.9rem] leading-[1.04] tracking-[-0.035em] text-pearl">
                    Bring the problem.
                    <br />
                    <span className="text-white/40">I&apos;ll bring the plan.</span>
                  </h3>
                  <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                    One slot open for Q4 2026. Ideal for product teams that value craft, clarity, and
                    shipping on time.
                  </p>

                  <div className="my-6 h-px w-full bg-white/[0.08]" />

                  <div className="space-y-2.5">
                    {['Response within 24 hours', 'Fixed scope & timeline', 'Direct developer contact'].map(
                      (item) => (
                        <div key={item} className="flex items-center gap-2.5 text-[10px] text-white/45">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/[0.1]">
                            <span className="h-1 w-1 rounded-full bg-electric/70" />
                          </span>
                          {item}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-7">
                    <div className="relative overflow-hidden rounded-full p-[1px]">
                      <span className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,#5B8CFF_330deg,#A78BFA_360deg)]" aria-hidden="true" />
                      <button
                        type="button"
                        onClick={() => scrollToId('contact')}
                        className="group relative flex w-full items-center justify-between rounded-full bg-[#090B11] py-2 pl-5 pr-2 text-[11px] font-medium text-pearl transition-colors hover:bg-[#0C101A]"
                      >
                        Start a project
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl text-ink transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </button>
                    </div>
                    <p className="mono mt-3 text-center text-[6.5px] text-white/15">
                      OR EMAIL {site.email.toUpperCase()}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.015] p-5">
                  <div className="flex gap-1 text-electric/80">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-white/45">
                    &ldquo;Rare combination of taste and engineering discipline. GOSOGOOD translated a
                    fuzzy idea into a product our customers actually love.&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.06] pt-3.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet font-mono text-[7px] text-white">
                      NV
                    </span>
                    <div>
                      <p className="text-[9px] text-white/50">Nara V.</p>
                      <p className="mono mt-0.5 text-[6px] text-white/20">FOUNDER, NEBULA</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
