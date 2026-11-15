import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Gamepad2, MapPin, Music2, Code2 } from 'lucide-react'
import { marqueeWords, site } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { useLocalTime } from '@/hooks/useLocalTime'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Marquee } from '@/components/ui/Marquee'
import { SocialLinks } from '@/components/ui/SocialLinks'

const ease = [0.16, 1, 0.3, 1] as const

function IntroText({ text }: { text: string }) {
  const parts = text.split('PUBG')
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && <span className="font-medium text-pearl">PUBG</span>}
        </Fragment>
      ))}
    </>
  )
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const localTime = useLocalTime()
  const { copy, format } = useI18n()
  const { hero } = copy

  const lineReveal = (delay: number) => ({
    initial: reducedMotion ? { y: 0 } : { y: '112%' },
    animate: { y: 0 },
    transition: { duration: 1.05, delay: reducedMotion ? 0 : delay, ease },
  })

  const fadeUp = (delay: number, distance = 20) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reducedMotion ? 0 : delay, ease },
  })

  const facts = [format(hero.factAge, { age: site.age }), hero.factBuilds, hero.factStatus]

  return (
    <section id="home" className="relative overflow-hidden border-b border-pearl/[0.12] pt-[76px]">
      <div className="container-page">
        <motion.div
          {...fadeUp(0.08, 8)}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-pearl/[0.12] py-4"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 bg-electric" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-electric">{hero.badge}</span>
            </span>
            <span className="mono hidden text-pearl/45 sm:block">{hero.notTakingWork}</span>
          </div>

          <span className="mono hidden text-pearl/40 md:block">{hero.roleLine}</span>

          <div className="flex items-center gap-2.5">
            <MapPin className="h-3.5 w-3.5 text-pearl/45" strokeWidth={1.5} />
            <span className="mono text-pearl/55">{hero.locationLine}</span>
            <span className="h-3 w-px bg-pearl/20" />
            <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-pearl/65">{localTime}</span>
            <span className="mono text-pearl/40">ICT</span>
          </div>
        </motion.div>

        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-16 xl:gap-16">
          <div className="lg:col-span-8">
            <motion.div {...fadeUp(0.16, 10)} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="mono text-pearl/50">{hero.portfolio}</span>
              <span className="h-px w-10 bg-pearl/30" />
              <span className="mono text-electric">{hero.since}</span>
            </motion.div>

            <h1 aria-label={hero.srHeading}>
              <span className="sr-only">{hero.srDescription}</span>
              <span aria-hidden="true" className="block">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.22)}
                    className="display hero-display block text-[clamp(3.3rem,8.2vw,8.2rem)] uppercase leading-[0.88] tracking-[-0.05em] text-outline"
                  >
                    {hero.title.line1}
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.3)}
                    className="display hero-display block text-[clamp(3.3rem,8.2vw,8.2rem)] uppercase leading-[0.88] tracking-[-0.05em] text-pearl"
                  >
                    {hero.title.line2}
                    <span className="text-electric">.</span>
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    {...lineReveal(0.38)}
                    className="accent-serif hero-display block text-[clamp(3.6rem,9vw,9rem)] italic leading-[0.84] tracking-[-0.04em] text-electric"
                  >
                    {hero.title.line3}
                    <span className="not-italic text-pearl">.</span>
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-8 max-w-[42rem] text-pretty text-[1.06rem] leading-[1.8] text-mist md:text-[1.12rem]"
            >
              <IntroText text={format(hero.intro, { age: site.age })} />
            </motion.p>

            <motion.div {...fadeUp(0.6)} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => scrollToId('work')}>{hero.ctaProjects}</MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollToId('contact')}>
                {hero.ctaContact}
              </MagneticButton>
            </motion.div>

            <motion.div
              {...fadeUp(0.7)}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-pearl/[0.12] pt-5"
            >
              {facts.map((fact, index) => (
                <span key={fact} className="flex items-center gap-5">
                  {index > 0 && <span className="h-1 w-1 bg-pearl/30" />}
                  <span className="mono text-pearl/60">{fact}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: reducedMotion ? 0 : 0.42, ease }}
            className="lg:col-span-4"
          >
            <HeroCard />
          </motion.div>
        </div>
      </div>

      <div className="border-t border-pearl/[0.12] bg-panel">
        <div className="container-page flex items-center gap-6">
          <div className="hidden shrink-0 items-center gap-2 border-r border-pearl/[0.14] py-4 pr-6 md:flex">
            <span className="h-1.5 w-1.5 bg-electric" />
            <span className="mono">{hero.toolsLabel}</span>
          </div>
          <Marquee
            items={marqueeWords}
            className="py-4 text-pearl/55"
            itemClassName="text-[clamp(0.95rem,1.7vw,1.3rem)]"
            duration={46}
          />
          <div className="hidden shrink-0 items-center gap-2 border-l border-pearl/[0.14] py-4 pl-6 md:flex">
            <ArrowDown className="h-3.5 w-3.5 text-pearl/50" strokeWidth={1.5} />
            <span className="mono">{hero.scroll}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroCard() {
  const { copy } = useI18n()
  const { card } = copy.hero
  const base = copy.common.locationShort.split(',')[0]

  const rows = [
    { label: card.base, value: base },
    { label: card.age, value: String(site.age) },
    { label: card.school, value: card.schoolValue },
    { label: card.statusLabel, value: card.statusValue },
  ]

  const tags = [
    { label: card.tags[0], icon: Gamepad2 },
    { label: card.tags[1], icon: Music2 },
    { label: card.tags[2], icon: Code2 },
  ]

  return (
    <div className="border border-electric bg-electric text-white">
      <div className="flex items-center justify-between gap-3 border-b border-white/25 px-5 py-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{card.identity}</span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {card.studying}
        </span>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
              {card.developerIdentity}
            </p>
            <p className="display mt-2 text-[clamp(2.1rem,3.2vw,2.9rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
              _gosogood
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">{card.publicBuilds}</p>
            <p className="display mt-1 text-[2.4rem] leading-none tracking-[-0.04em] text-white">
              04<span className="text-white/45">.</span>
            </p>
          </div>
        </div>

        <p className="mt-5 text-[17px] font-medium text-white">{copy.common.realName}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-white/75">{copy.common.role}</p>
      </div>

      <dl className="grid grid-cols-2 gap-px border-t border-white/25 bg-white/25">
        {rows.map((row) => (
          <div key={row.label} className="bg-electric px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">{row.label}</dt>
            <dd className="mt-1.5 text-[15px] leading-snug text-white">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/25 px-5 py-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-white/85"
            >
              <tag.icon className="h-3 w-3" strokeWidth={1.6} />
              {tag.label}
            </span>
          ))}
        </div>
        <SocialLinks inverse className="gap-0.5" iconClassName="h-8 w-8" />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/25 px-5 py-3 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/60">
        <span>{card.footer}</span>
        <span>{site.coordinates}</span>
      </div>
    </div>
  )
}
