import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Atom, Braces, Code2, Plus, Rocket, Sparkles } from 'lucide-react'
import { honestNotes, learningLoop, skills } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const skillIcons: Record<string, ReactNode> = {
  code: <Code2 className="h-4 w-4" strokeWidth={1.4} />,
  braces: <Braces className="h-4 w-4" strokeWidth={1.4} />,
  atom: <Atom className="h-4 w-4" strokeWidth={1.4} />,
  sparkles: <Sparkles className="h-4 w-4" strokeWidth={1.4} />,
  rocket: <Rocket className="h-4 w-4" strokeWidth={1.4} />,
}

export function Skills() {
  const [open, setOpen] = useState(0)

  return (
    <section id="skills" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="05"
            label="Skills"
            meta="HONESTLY LABELLED"
            title={
              <>
                A small skill set,
                <br />
                <span className="font-serif italic tracking-[-0.03em] text-gradient">named honestly.</span>
              </>
            }
            description="No ratings out of ten. Five areas I have used in real builds, with the parts I am still learning left visible."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border-t border-pearl/[0.08]">
              {skills.map((item, index) => {
                const isOpen = open === index
                return (
                  <Reveal key={item.number} delay={index * 0.035}>
                    <div className="border-b border-pearl/[0.08]">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : index)}
                        className="group flex w-full items-start gap-3 py-5 text-left sm:items-center sm:gap-5 sm:py-6"
                        aria-expanded={isOpen}
                        aria-controls={`skill-panel-${index}`}
                      >
                        <span className="mono mt-1 w-5 shrink-0 text-pearl/15 sm:mt-0">{item.number}</span>
                        <span
                          className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300',
                            isOpen
                              ? 'border-electric/30 bg-electric/[0.08] text-electric'
                              : 'border-pearl/[0.08] bg-pearl/[0.02] text-pearl/35 group-hover:text-pearl/60',
                          )}
                        >
                          {skillIcons[item.icon]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="display block text-[clamp(1.25rem,2.4vw,1.8rem)] tracking-[-0.035em] text-pearl">
                              {item.title}
                            </span>
                            <span className="rounded-full border border-pearl/[0.08] bg-pearl/[0.025] px-2 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.1em] text-pearl/30">
                              {item.level}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-[10px] leading-relaxed text-pearl/30">
                            {item.subtitle}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:mt-0',
                            isOpen
                              ? 'rotate-45 border-electric/30 bg-electric/[0.08] text-electric'
                              : 'border-pearl/[0.1] text-pearl/30 group-hover:border-pearl/25 group-hover:text-pearl/60',
                          )}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`skill-panel-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-6 pb-7 pl-8 sm:grid-cols-12 sm:pl-[4.5rem]">
                              <p className="text-pretty text-[0.88rem] leading-[1.75] text-mist sm:col-span-7">
                                {item.description}
                              </p>
                              <div className="sm:col-span-5">
                                <p className="mono text-pearl/20">Tools</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                  {item.tools.map((tool) => (
                                    <span
                                      key={tool}
                                      className="rounded-full border border-electric/15 bg-electric/[0.04] px-2.5 py-1 text-[8px] text-electric-soft/55"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                                <p className="mono mt-4 text-pearl/15">Used in</p>
                                <p className="mt-1.5 text-[9px] leading-relaxed text-pearl/35">
                                  {item.usedIn.join(' · ')}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 border-t border-pearl/[0.07] pt-6 sm:grid-cols-4">
                {learningLoop.map(([number, title, note]) => (
                  <div key={number}>
                    <span className="font-mono text-[8px] text-electric/50">{number}</span>
                    <p className="mt-2 text-[11px] text-pearl/55">{title}</p>
                    <p className="mt-1 text-[9px] leading-relaxed text-pearl/25">{note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-[28px] border border-pearl/[0.1] bg-gradient-to-b from-pearl/[0.055] to-pearl/[0.015] p-6 sm:p-7 lg:sticky lg:top-24">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/[0.12] blur-[60px]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="mono text-pearl/25">Current level</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-electric" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-electric-soft/55">
                      Learning
                    </span>
                  </span>
                </div>

                <h3 className="display mt-8 text-[clamp(2rem,3.2vw,2.8rem)] leading-[0.98] tracking-[-0.04em] text-pearl">
                  Student first.{' '}
                  <span className="font-serif italic text-gradient">Developer later.</span>
                </h3>
                <p className="mt-4 text-[0.86rem] leading-[1.75] text-mist">
                  I am not a professional yet. These are things I have actually built with, and the list keeps
                  changing as I learn.
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-pearl/[0.07] pt-5">
                  {honestNotes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[10px] text-pearl/40">
                      <span className="h-1 w-1 rounded-full bg-electric/70" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between gap-3 rounded-2xl border border-pearl/[0.08] bg-pearl/[0.02] px-4 py-3.5">
                  <div>
                    <p className="mono text-pearl/20">Status</p>
                    <p className="mt-1 text-[10px] text-pearl/55">Studying — not taking work</p>
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
