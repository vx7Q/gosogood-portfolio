import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MousePointer2, Plus } from 'lucide-react'
import { techFilters, technologies, type TechFilter } from '@/lib/data'
import { cn, publicAsset } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'

const extraTools = [
  'Tailwind CSS',
  'Framer Motion',
  'PostgreSQL',
  'Prisma',
  'Redis',
  'Docker',
  'AWS',
  'Figma',
  'Vercel',
  'Stripe',
  'Sanity',
  'Jest',
]

export function Skills() {
  const [filter, setFilter] = useState<TechFilter>('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? technologies : technologies.filter((tech) => tech.category === filter)),
    [filter],
  )

  return (
    <section id="skills" className="section-space relative">
      <div className="container-page relative z-10">
        <SectionHeader
          index="03"
          label="Tech Stack"
          meta="TOOLS OF THE TRADE"
          title={
            <>
              <span className="block">
                <SplitText text="A stack built for" />
              </span>
              <span className="block">
                <SplitText text="shipping things." wordClassName="text-gradient" delay={0.15} />
              </span>
            </>
          }
          description="Not a list of logos — a working toolkit refined across five years of real products, real deadlines, and real users."
        />

        <Reveal>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="glass no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1" role="group" aria-label="Filter technologies">
              {techFilters.map((item) => {
                const count =
                  item === 'All' ? technologies.length : technologies.filter((tech) => tech.category === item).length
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => {
                      setFilter(item)
                      setExpanded(null)
                    }}
                    className={cn(
                      'relative shrink-0 rounded-full px-3.5 py-2 text-[11px] font-medium transition-colors duration-300 sm:px-4',
                      filter === item ? 'text-pearl' : 'text-white/40 hover:text-white/70',
                    )}
                  >
                    {filter === item && (
                      <motion.span
                        layoutId="tech-filter-pill"
                        className="absolute inset-0 rounded-full border border-white/[0.1] bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {item}
                      <span className={cn('font-mono text-[8px]', filter === item ? 'text-electric/70' : 'text-white/20')}>
                        {String(count).padStart(2, '0')}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <MousePointer2 className="h-3 w-3 text-white/20" strokeWidth={1.5} />
              <span className="mono text-white/25">CLICK A CARD FOR DETAILS</span>
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, index) => {
              const isOpen = expanded === tech.name
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.025, 0.2) }}
                >
                  <TiltCard maxTilt={5} className="h-full">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : tech.name)}
                      aria-expanded={isOpen}
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.075] bg-white/[0.022] p-4 text-left transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.04] sm:p-5"
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-25"
                        style={{ backgroundColor: tech.color }}
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `linear-gradient(90deg, transparent, ${tech.color}88, transparent)` }}
                        aria-hidden="true"
                      />

                      <div className="relative flex items-start justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] transition-all duration-500 group-hover:border-white/[0.14] group-hover:bg-white/[0.05]">
                          <img
                            src={publicAsset(tech.icon)}
                            alt={`${tech.name} logo`}
                            width={22}
                            height={22}
                            loading="lazy"
                            className="h-[22px] w-[22px] transition-transform duration-500 group-hover:scale-110"
                          />
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="font-mono text-[8px] text-white/15">
                            {String(technologies.findIndex((item) => item.name === tech.name) + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] text-white/25 transition-all duration-500',
                              isOpen && 'rotate-45 border-electric/30 bg-electric/10 text-electric',
                            )}
                          >
                            <Plus className="h-2.5 w-2.5" strokeWidth={1.75} />
                          </span>
                        </span>
                      </div>

                      <div className="relative mt-5">
                        <h3 className="text-[0.9rem] font-medium text-pearl/90 transition-colors group-hover:text-white">
                          {tech.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/25">
                          {tech.category}
                        </p>
                      </div>

                      <div className="relative mt-auto pt-5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="mono text-[7px] text-white/20">{tech.years} YRS</span>
                          <span className="font-mono text-[8px] tabular-nums text-white/35">{tech.level}%</span>
                        </div>
                        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.15 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}66` }}
                          />
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative overflow-hidden"
                          >
                            <div className="mt-4 border-t border-white/[0.07] pt-3">
                              <p className="text-[10.5px] leading-relaxed text-mist">{tech.note}</p>
                              <p className="mono mt-2.5 text-[7px] text-white/25">
                                {tech.years} YEARS · PRODUCTION USE
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </TiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="h-1 w-1 rounded-full bg-violet/70" />
              <span className="mono text-white/30">ALSO IN THE KIT</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {extraTools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10.5px] text-white/35 transition-colors duration-300 hover:text-white/75"
                >
                  {tool}
                </span>
              ))}
            </div>
            <span className="mono hidden text-white/15 lg:block">{extraTools.length} EXTRAS</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
