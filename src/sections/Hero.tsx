import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Boxes, Code2, Gamepad2, MapPin, Music2 } from 'lucide-react'
import { heroFacts, marqueeWords, site } from '@/lib/data'
import { scrollToId } from '@/lib/scroll'
import { useLocalTime } from '@/hooks/useLocalTime'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Marquee } from '@/components/ui/Marquee'
import { SocialLinks } from '@/components/ui/SocialLinks'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reducedMotion = useReducedMotion()
  const localTime = useLocalTime()

  const lineReveal = (delay: number) => ({
    initial: reducedMotion ? { y: 0 } : { y: '112%' },
    animate: { y: 0 },
    transition: { duration: 1.05, delay: reducedMotion ? 0 : delay, ease },
  })

  const fadeUp = (delay: number, distance = 20) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: distance, filter: 'blur(7px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay: reducedMotion ? 0 : delay, ease },
  })

  return (
    <section id="home" className="relative isolate overflow-hidden pt-[104px] sm:pt-[116px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap font-display text-[24vw] leading-none tracking-[-0.08em] text-pearl/[0.018]"
      >
        _gosogood
      </span>

      <div className="container-page relative z-10">
        <motion.div
          {...fadeUp(0.1, 8)}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-pearl/[0.08] pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.06] py-1.5 pl-2.5 pr-3.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-electric-soft/80">
                Currently studying
              </span>
            </span>
            <span className="mono hidden text-pearl/25 sm:block">NOT TAKING WORK</span>
          </div>

          <span className="mono hidden text-pearl/25 md:block">STUDENT / FRONT-END LEARNER</span>

          <div className="flex items-center gap-2.5">
            <MapPin className="h-3 w-3 text-pearl/25" strokeWidth={1.5} />
            <span className="mono text-pearl/35">SUPHAN BURI, TH</span>
            <span className="h-2.5 w-px bg-pearl/15" />
            <span className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-pearl/45">{localTime}</span>
            <span className="mono text-pearl/20">ICT</span>
          </div>
        </motion.div>

        <div className="grid items-center gap-14 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-16 xl:gap-10">
          <div className="relative z-10 lg:col-span-7">
            <motion.div {...fadeUp(0.2, 10)} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="mono text-pearl/25">PORTFOLIO — 2026</span>
              <span className="h-px w-8 bg-gradient-to-r from-pearl/25 to-transparent" />
              <span className="mono text-electric-soft/70">WEB SINCE M.3</span>
            </motion.div>

            <h1 aria-label="Still in school. Still building. — _gosogood">
              <span className="sr-only">
                _gosogood — a student learning front-end in Suphan Buri, Thailand.
              </span>
              <span aria-hidden="true" className="block">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.28)}
                    className="display block text-[clamp(3.2rem,7.7vw,6.8rem)] uppercase leading-[0.88] tracking-[-0.045em] text-outline"
                  >
                    Still in
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.36)}
                    className="display block text-[clamp(3.2rem,7.7vw,6.8rem)] uppercase leading-[0.88] tracking-[-0.045em] text-pearl"
                  >
                    School
                    <span className="text-electric">.</span>
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    {...lineReveal(0.44)}
                    className="block font-serif text-[clamp(3.6rem,8.8vw,7.6rem)] italic leading-[0.84] tracking-[-0.04em] text-gradient"
                  >
                    still building<span className="not-italic text-electric">.</span>
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(0.58)}
              className="mt-7 max-w-[34rem] text-pretty text-[0.94rem] leading-[1.75] text-mist md:text-base"
            >
              I&apos;m <span className="text-pearl">_gosogood</span> — a {site.age}-year-old student in Suphan
              Buri. I build small websites, play <span className="text-pearl">PUBG</span>, and start more projects
              than I finish.
            </motion.p>

            <motion.div {...fadeUp(0.68)} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => scrollToId('work')}>See my projects</MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollToId('contact')}>
                Say hi
              </MagneticButton>
            </motion.div>

            <motion.div {...fadeUp(0.78)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {heroFacts.map((fact, index) => (
                <span key={fact} className="flex items-center gap-5">
                  {index > 0 && <span className="h-1 w-1 rounded-full bg-pearl/20" />}
                  <span className="mono text-pearl/30">{fact}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.15, delay: reducedMotion ? 0 : 0.48, ease }}
            className="relative lg:col-span-5"
          >
            <HeroCard />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-y border-pearl/[0.08] bg-ink/30 backdrop-blur-sm">
        <div className="container-page flex items-center gap-6">
          <div className="hidden shrink-0 items-center gap-2 border-r border-pearl/[0.08] py-4 pr-6 md:flex">
            <span className="h-1 w-1 rounded-full bg-electric" />
            <span className="mono text-pearl/30">Tools I use</span>
          </div>
          <Marquee items={marqueeWords} className="py-4" duration={46} />
          <div className="hidden shrink-0 items-center gap-2 border-l border-pearl/[0.08] py-4 pl-6 md:flex">
            <ArrowDown className="h-3 w-3 text-pearl/30" strokeWidth={1.5} />
            <span className="mono text-pearl/25">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-[410px] lg:ml-auto lg:mr-1 xl:mr-6">
      <div
        className="absolute -inset-14 -z-10 rounded-full opacity-70 blur-[74px]"
        style={{
          background:
            'radial-gradient(circle at 55% 35%, rgba(110, 139, 255, 0.3), rgba(110, 139, 255, 0.12) 42%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[122%] w-[122%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full border border-pearl/[0.055]" />
        <div
          className="absolute inset-[9%] rounded-[46%] border border-pearl/[0.045]"
          style={{ transform: 'rotate(28deg)' }}
        />
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric/60 shadow-[0_0_12px_#6E8BFF]" />
        <div className="absolute bottom-[9%] right-[14%] h-1 w-1 rounded-full bg-pearl/70 shadow-[0_0_10px_#F2F0E8]" />
      </div>

      <div className="pointer-events-none absolute -inset-5 z-0 hidden sm:block" aria-hidden="true">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-pearl/20" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-pearl/20" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-pearl/20" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-pearl/20" />
      </div>

      <div className="absolute -right-4 -top-10 z-20 hidden animate-float-slow md:block">
        <div className="flex items-center gap-3 rounded-full border border-pearl/[0.1] bg-panel/90 py-2 pl-2.5 pr-4 shadow-soft backdrop-blur-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric/10 text-electric">
            <Boxes className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
          <div>
            <p className="mono text-[7px] text-pearl/30">PUBLIC BUILDS</p>
            <p className="font-display text-sm leading-tight text-pearl">
              04<span className="text-electric">.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative rounded-[26px] border border-pearl/[0.12] bg-gradient-to-b from-pearl/[0.07] to-pearl/[0.02] p-[6px] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(110,139,255,0.3)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] opacity-60"
          style={{
            background:
              'linear-gradient(130deg, rgba(242,240,232,0.12), transparent 28%, transparent 72%, rgba(110,139,255,0.12))',
          }}
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-[21px] border border-pearl/[0.06] bg-[#090C12]/95">
          <div
            className="absolute inset-0 bg-grid-lines bg-[size:28px_28px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between border-b border-pearl/[0.07] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-pearl/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-pearl/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric/70 shadow-[0_0_6px_#6E8BFF]" />
            </div>
            <span className="mono text-[7.5px] text-pearl/25">IDENTITY / 2026</span>
            <span className="mono flex items-center gap-1.5 text-[7.5px] text-electric-soft/70">
              <span className="h-1 w-1 rounded-full bg-electric" />
              STUDYING
            </span>
          </div>

          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-electric/20 blur-xl" aria-hidden="true" />
                <div
                  className="relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 22%, #ffffff 0%, #dfe6ff 10%, #b7c4ff 20%, #7a97ff 38%, #3b4fc4 58%, #151a3a 78%, #07090d 100%)',
                    boxShadow:
                      'inset -10px -14px 26px rgba(0,0,0,0.75), inset 4px 6px 18px rgba(255,255,255,0.28), 0 20px 40px -18px rgba(110,139,255,0.65)',
                  }}
                  aria-hidden="true"
                >
                  <div className="absolute left-[15%] top-[10%] h-[32%] w-[48%] rounded-full bg-pearl/50 blur-xl" />
                  <div className="absolute inset-[17%] rounded-full border border-pearl/15" />
                  <span className="relative font-display text-[2.2rem] font-medium tracking-[-0.1em] text-pearl/90">
                    _
                  </span>
                </div>
                <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-pearl shadow-[0_0_10px_#F2F0E8]" />
              </div>

              <div className="text-right">
                <p className="mono text-[7px] text-pearl/25">STATUS</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-electric/20 bg-electric/[0.06] px-2 py-1">
                  <span className="h-1 w-1 rounded-full bg-electric" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-electric-soft/75">
                    Not taking work
                  </span>
                </span>
                <p className="mono mt-4 text-[7px] text-pearl/20">SINCE / M.3</p>
                <p className="mt-1 font-mono text-[9px] text-pearl/45">SUPHAN BURI · TH</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mono text-[7.5px] text-pearl/25">DEVELOPER IDENTITY</p>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="display text-[1.9rem] font-semibold tracking-[-0.05em] text-pearl">
                  <span className="text-electric">_</span>gosogood
                </span>
              </div>
              <p className="mt-1 text-[10px] text-pearl/55">{site.realNameEn}</p>
              <p className="mt-0.5 text-[11px] text-mist">Student &amp; front-end learner</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-pearl/[0.08] bg-pearl/[0.06]">
              {[
                { label: 'BASE', value: 'Suphan Buri' },
                { label: 'AGE', value: String(site.age) },
                { label: 'SCHOOL', value: 'Songphinong' },
                { label: 'STATUS', value: 'Studying' },
              ].map((row) => (
                <div key={row.label} className="bg-[#0B0E14]/95 px-3 py-2.5">
                  <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-pearl/20">{row.label}</p>
                  <p className="mt-1 text-[10px] text-pearl/65">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { label: 'PUBG', icon: Gamepad2 },
                  { label: 'MUSIC', icon: Music2 },
                  { label: 'CODE', icon: Code2 },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1 rounded-full border border-pearl/[0.09] bg-pearl/[0.025] px-2 py-1 font-mono text-[6.5px] tracking-[0.1em] text-pearl/40"
                  >
                    <tag.icon className="h-2 w-2" strokeWidth={1.6} />
                    {tag.label}
                  </span>
                ))}
              </div>
              <SocialLinks iconClassName="h-6 w-6 justify-center rounded-full border border-pearl/[0.09] bg-pearl/[0.02]" />
            </div>
          </div>

          <div className="relative flex items-center justify-between border-t border-pearl/[0.07] px-4 py-2.5">
            <span className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-pearl/20">
              STUDENT — NOT FOR HIRE
            </span>
            <span className="font-mono text-[6.5px] tracking-[0.12em] text-pearl/25">{site.coordinates}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
