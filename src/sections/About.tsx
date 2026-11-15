import {
  ArrowUpRight,
  Asterisk,
  Gamepad2,
  GraduationCap,
  Headphones,
  Music2,
  Trophy,
} from 'lucide-react'
import { site } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const interestIcons = [Gamepad2, Music2, Trophy] as const
const statValues = ['04', String(site.age), '02', '01'] as const

export function About() {
  const { copy, format } = useI18n()
  const { about, common } = copy
  const values = { age: site.age, school: common.schoolShort, name: common.realName }

  return (
    <section id="about" className="section-space section-anchor relative">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="01"
            label={about.label}
            meta={about.meta}
            title={
              <>
                {about.titleLead}
                <br />
                <span className="accent-serif italic tracking-[-0.03em] text-gradient">
                  {about.titleAccent}
                </span>
              </>
            }
            description={format(about.description, values)}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SpotlightCard className="glass p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="mono">{about.whoLabel}</span>
                <span lang="th" className="font-thai text-[10px] text-pearl/55">
                  {about.identityLine}
                </span>
              </div>

              <h3 className="display mt-8 max-w-xl text-balance text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.08] tracking-[-0.035em] text-pearl">
                {about.heading}{' '}
                <span className="accent-serif italic tracking-[-0.02em] text-electric-soft">
                  {about.headingAccent}
                </span>
              </h3>

              <div className="mt-6 space-y-4">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl text-pretty text-[0.98rem] leading-[1.8] text-mist">
                    {format(paragraph, values)}
                  </p>
                ))}
              </div>

              <blockquote className="mt-8 border-l border-electric/40 pl-4">
                <p className="accent-serif max-w-xl text-[1.5rem] italic leading-snug tracking-[-0.01em] text-pearl/85">
                  {about.quote}
                </p>
              </blockquote>

              <div className="mt-9 grid gap-3 border-t border-pearl/[0.12] pt-6 sm:grid-cols-3">
                {about.principles.map((principle, index) => (
                  <div key={principle} className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-electric">0{index + 1}</span>
                    <span className="text-[13px] text-pearl/75">{principle}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border border-pearl/[0.12] bg-ink/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="mono">{about.learning}</p>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-electric">
                    <span className="h-1 w-1 rounded-full bg-electric" /> {about.ongoing}
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {about.focus.map((item, index) => (
                    <div key={item.title}>
                      <p className="font-mono text-[10px] tracking-[0.06em] text-electric">0{index + 1}</p>
                      <p className="mt-1 text-[13px] leading-snug text-pearl/70">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="glass relative overflow-hidden p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono">{about.glance}</span>
                  <span className="h-1 w-1 rounded-full bg-electric" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-pearl/[0.12] bg-pearl/[0.12]">
                  {about.stats.map((stat, index) => (
                    <div key={stat.label} className="bg-panel p-4 sm:p-5">
                      <p className="display text-[2.4rem] leading-none tracking-[-0.04em] text-pearl">
                        {statValues[index]}
                        <span className="text-electric">.</span>
                      </p>
                      <p className="mt-2 text-[12px] text-pearl/70">{stat.label}</p>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-pearl/50">
                        {stat.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="glass p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono">{about.education}</span>
                  <GraduationCap className="h-3.5 w-3.5 text-electric" strokeWidth={1.5} />
                </div>

                <a
                  href={site.schoolUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 block"
                >
                  <p lang="th" className="font-thai text-[1.05rem] leading-relaxed text-pearl">
                    {site.schoolThai}
                  </p>
                  {common.schoolShort !== site.schoolThai && (
                    <p className="mt-1 text-[13px] leading-relaxed text-mist transition-colors group-hover:text-pearl">
                      {common.schoolShort}
                    </p>
                  )}
                  <p className="mono mt-3">{common.schoolLocation}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-electric transition-colors group-hover:text-pearl">
                    {about.schoolWebsite}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </a>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-pearl/[0.12] pt-4">
                  {about.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-pearl/[0.18] bg-panel px-2.5 py-1 text-[11px] tracking-[0.01em] text-pearl/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono">{about.outside}</span>
                  <Headphones className="h-3.5 w-3.5 text-electric" strokeWidth={1.5} />
                </div>

                <ul className="mt-5 space-y-4">
                  {about.interests.map((interest, index) => {
                    const Icon = interestIcons[index]
                    return (
                      <li key={interest.title} className="flex gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-pearl/[0.14] bg-ink text-electric">
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                        <div>
                          <p className="text-[14px] text-pearl">{interest.title}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-pearl/60">{interest.note}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                <p className="mt-5 flex items-center gap-2 border-t border-pearl/[0.12] pt-4 text-[11px] text-pearl/55">
                  <Asterisk className="h-3 w-3 text-electric" strokeWidth={1.6} />
                  {about.quietNote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-5 flex flex-col gap-4 border border-electric/25 bg-electric/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <span className="relative mt-1 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              <div>
                <p className="text-[14px] text-pearl/85">{common.availability}</p>
                <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-pearl/60">
                  {common.availabilityNote}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="group inline-flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-electric transition-colors hover:text-pearl"
            >
              {about.talkAnyway}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
