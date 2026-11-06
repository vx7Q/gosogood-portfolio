import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { marqueeWords, site } from '@/lib/data'
import { scrollToId } from '@/lib/utils'
import { useLocalTime } from '@/hooks/useLocalTime'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Marquee } from '@/components/ui/Marquee'
import { TiltCard } from '@/components/ui/TiltCard'
import { SocialLinks } from '@/components/ui/SocialLinks'

interface HeroProps {
  ready: boolean
}

const ease = [0.16, 1, 0.3, 1] as const

export function Hero({ ready }: HeroProps) {
  const reducedMotion = useReducedMotion()
  const localTime = useLocalTime(site.timezone)

  const lineReveal = (delay: number) => ({
    initial: reducedMotion ? { y: 0 } : { y: '112%' },
    animate: ready ? { y: 0 } : {},
    transition: { duration: 1.05, delay: reducedMotion ? 0 : delay, ease },
  })

  const fadeUp = (delay: number, y = 22) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.9, delay: reducedMotion ? 0 : delay, ease },
  })

  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div className="container-page relative z-10">
        {/* Status rail */}
        <motion.div
          {...fadeUp(0.15, 10)}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/[0.07] pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.045] py-1.5 pl-2.5 pr-3.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/75">
                Available for projects
              </span>
            </span>
            <span className="mono hidden text-white/20 sm:block">Q4 — 2026</span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <span className="mono text-white/25">FULL-STACK DEVELOPER / CREATIVE ENGINEER</span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="h-3 w-3 text-white/25" strokeWidth={1.5} />
            <span className="mono text-white/30">BANGKOK, TH</span>
            <span className="h-2.5 w-px bg-white/15" />
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/45 tabular-nums">{localTime}</span>
            <span className="mono text-white/20">ICT</span>
          </div>
        </motion.div>

        <div className="grid items-center gap-16 pb-20 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-16 xl:gap-10">
          {/* Copy */}
          <div className="relative z-10 lg:col-span-7">
            <motion.div {...fadeUp(0.24, 12)} className="mb-6 flex items-center gap-3">
              <span className="mono text-white/25">PORTFOLIO — 2026</span>
              <span className="h-px w-8 bg-gradient-to-r from-white/25 to-transparent" />
              <span className="mono text-electric/60">EST. 2020</span>
            </motion.div>

            <h1 aria-label="Building digital experiences — GOSOGOOD">
              <span className="sr-only">Building digital experiences — GOSOGOOD, full-stack developer.</span>
              <span aria-hidden="true" className="block">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.3)}
                    className="display block text-[clamp(2.5rem,5.4vw,4.5rem)] uppercase leading-[0.94] tracking-[-0.04em] text-pearl"
                  >
                    Building
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    {...lineReveal(0.38)}
                    className="display block text-[clamp(2.5rem,5.4vw,4.5rem)] uppercase leading-[0.94] tracking-[-0.04em] text-outline"
                  >
                    Digital
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    {...lineReveal(0.46)}
                    className="display block text-[clamp(2.5rem,5.4vw,4.5rem)] uppercase leading-[0.94] tracking-[-0.04em] text-gradient-animated"
                  >
                    Experiences<span className="ml-3 inline-block align-top text-[0.35em] text-electric">/</span>
                  </motion.span>
                </span>

                <span className="relative mt-5 flex items-center justify-between gap-6 border-t border-white/[0.08] pt-2">
                  <span className="mono text-white/25">FULL-STACK DEVELOPER</span>
                  <span className="mono text-white/20">BKK — GMT+7</span>
                </span>

                <motion.span
                  {...fadeUp(0.55, 30)}
                  className="mt-4 flex items-start gap-1"
                >
                  <span className="display block text-[clamp(4.1rem,10.3vw,8.35rem)] uppercase leading-[0.82] tracking-[-0.065em] text-gradient drop-shadow-[0_0_60px_rgba(91,140,255,0.12)]">
                    GOSOGOOD
                  </span>
                  <span className="mt-2 font-sans text-[10px] font-normal tracking-normal text-white/25">®</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(0.66)}
              className="mt-7 max-w-[29rem] text-[0.9375rem] leading-[1.7] text-mist md:text-base"
            >
              I build considered digital products at the intersection of{' '}
              <span className="text-pearl">engineering</span>, <span className="text-pearl">design</span>, and{' '}
              <span className="text-pearl">motion</span> — turning complex ideas into experiences that
              feel effortless.
            </motion.p>

            <motion.div {...fadeUp(0.76)} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => scrollToId('projects')}>View Projects</MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollToId('contact')}>
                Contact Me
              </MagneticButton>
            </motion.div>

            <motion.div
              {...fadeUp(0.86)}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {['5+ YEARS', '48+ PROJECTS', 'WORLDWIDE CLIENTS'].map((item, index) => (
                <span key={item} className="flex items-center gap-2">
                  {index > 0 && <span className="mr-4 h-1 w-1 rounded-full bg-white/15" />}
                  <span className="mono text-white/25">{item}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Floating identity artifact */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: reducedMotion ? 0 : 0.5, ease }}
            className="relative lg:col-span-5"
          >
            <HeroArtifact />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-y border-white/[0.07] bg-ink/30 backdrop-blur-sm">
        <div className="container-page flex items-center gap-6">
          <div className="hidden shrink-0 items-center gap-2 border-r border-white/[0.08] py-4 pr-6 md:flex">
            <span className="h-1 w-1 rounded-full bg-electric" />
            <span className="mono text-white/30">CORE STACK</span>
          </div>
          <Marquee items={marqueeWords} className="py-4" duration={42} />
          <div className="hidden shrink-0 items-center gap-2 border-l border-white/[0.08] py-4 pl-6 md:flex">
            <ArrowDown className="h-3 w-3 text-white/30" strokeWidth={1.5} />
            <span className="mono text-white/25">SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroArtifact() {
  return (
    <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto lg:mr-2 xl:mr-8">
      {/* Ambient aura */}
      <div
        className="absolute -inset-16 -z-10 rounded-full opacity-60 blur-[70px]"
        style={{
          background:
            'radial-gradient(circle at 55% 35%, rgba(70, 100, 255, 0.33), rgba(125, 72, 255, 0.14) 42%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Orbit lines */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-white/[0.055]" />
        <div className="absolute inset-[9%] rounded-[46%] border border-white/[0.045]" style={{ transform: 'rotate(28deg)' }} />
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric/60 shadow-[0_0_12px_#5B8CFF]" />
        <div className="absolute bottom-[9%] right-[14%] h-1 w-1 rounded-full bg-violet/70 shadow-[0_0_10px_#9A6BFF]" />
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute -inset-5 z-0 hidden sm:block" aria-hidden="true">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/20" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/20" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/20" />
      </div>

      {/* Rotating badge */}
      <div className="absolute -bottom-9 -right-7 z-20 hidden h-[112px] w-[112px] items-center justify-center sm:flex">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
          <defs>
            <path id="hero-badge-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
          </defs>
          <circle cx="60" cy="60" r="59" fill="rgba(8,9,13,0.72)" stroke="rgba(255,255,255,0.1)" />
          <text className="fill-white/40 font-mono text-[7.5px] uppercase" style={{ letterSpacing: '0.28em' }}>
            <textPath href="#hero-badge-circle">OPEN FOR SELECT PROJECTS — 2026 — </textPath>
          </text>
        </svg>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur">
          <ArrowUpRight className="h-4 w-4 text-pearl" strokeWidth={1.4} />
        </span>
      </div>

      {/* Floating code chip */}
      <div className="pointer-events-none absolute -bottom-14 -left-20 z-20 hidden w-[228px] -rotate-[4deg] xl:block">
        <div className="animate-float rounded-2xl border border-white/[0.1] bg-[#0B0D14]/90 p-3.5 shadow-soft backdrop-blur-xl">
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-electric/60" />
            <span className="ml-auto font-mono text-[8px] text-white/25">identity.ts</span>
          </div>
          <pre className="font-mono text-[9px] leading-[1.8] text-white/40">
            <code>
              <span className="text-violet-300/80">const</span> developer = {'{'}
              {'\n'}  name: <span className="text-emerald-300/70">'GOSOGOOD'</span>,
              {'\n'}  craft: <span className="text-electric-soft">'digital products'</span>,
              {'\n'}  available: <span className="text-electric">true</span>
              {'\n'}
              {'}'}<span className="ml-0.5 inline-block h-2.5 w-[5px] animate-pulse bg-electric/70 align-middle" />
            </code>
          </pre>
        </div>
      </div>

      {/* Stat chip */}
      <div className="absolute -right-5 -top-5 z-20 hidden animate-float-slow md:block">
        <div className="flex items-center gap-3 rounded-full border border-white/[0.1] bg-[#0B0D14]/85 py-2 pl-2.5 pr-4 shadow-soft backdrop-blur-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric/10 text-electric">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
          <div>
            <p className="mono text-[7px] text-white/30">SHIPPED</p>
            <p className="font-display text-sm leading-tight text-pearl">
              48<span className="text-electric">+</span>
            </p>
          </div>
        </div>
      </div>

      <TiltCard maxTilt={6} className="relative z-10">
        <div className="relative rounded-[26px] border border-white/[0.11] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-[6px] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(91,140,255,0.3)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-[26px] opacity-60"
            style={{ background: 'linear-gradient(130deg, rgba(255,255,255,0.12), transparent 28%, transparent 72%, rgba(154,107,255,0.1))' }}
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[21px] border border-white/[0.055] bg-[#090B11]/95">
            <div
              className="absolute inset-0 bg-grid-lines bg-[size:28px_28px] opacity-[0.35]"
              style={{
                maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-electric/70 shadow-[0_0_6px_#5B8CFF]" />
              </div>
              <span className="mono text-[7.5px] text-white/25">IDENTITY / 001</span>
              <span className="mono flex items-center gap-1.5 text-[7.5px] text-emerald-300/60">
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
                ONLINE
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
                        'radial-gradient(circle at 30% 22%, #ffffff 0%, #cfdaff 10%, #7a97ff 28%, #4a3ae0 52%, #1a1640 72%, #06070c 100%)',
                      boxShadow:
                        'inset -10px -14px 26px rgba(0,0,0,0.75), inset 4px 6px 18px rgba(255,255,255,0.28), 0 20px 40px -18px rgba(91,140,255,0.65)',
                    }}
                    aria-hidden="true"
                  >
                    <div className="absolute left-[15%] top-[10%] h-[32%] w-[48%] rounded-full bg-white/50 blur-xl" />
                    <div className="absolute inset-[17%] rounded-full border border-white/15" />
                    <span className="relative font-display text-[1.9rem] font-medium tracking-tight text-white/90">
                      G
                    </span>
                  </div>
                  <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                </div>

                <div className="text-right">
                  <p className="mono text-[7px] text-white/25">STATUS</p>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-2 py-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-300" />
                    <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-emerald-200/70">
                      Available
                    </span>
                  </span>
                  <p className="mono mt-4 text-[7px] text-white/20">SINCE / 2020</p>
                  <p className="mt-1 font-mono text-[9px] text-white/45">BANGKOK · TH</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mono text-[7.5px] text-white/25">DEVELOPER IDENTITY</p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="display text-[1.75rem] uppercase leading-none tracking-[-0.04em] text-pearl">
                    GOSOGOOD
                  </span>
                  <span className="font-sans text-[8px] text-white/25">®</span>
                </div>
                <p className="mt-1.5 text-[11px] text-mist">Full-stack developer &amp; design engineer</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06]">
                {[
                  { label: 'BASE', value: 'Bangkok, TH' },
                  { label: 'FOCUS', value: 'Product eng.' },
                  { label: 'EXPERIENCE', value: '5+ years' },
                  { label: 'RESPONSE', value: '< 24 hrs' },
                ].map((row) => (
                  <div key={row.label} className="bg-[#0B0D14]/95 px-3 py-2.5">
                    <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-white/20">{row.label}</p>
                    <p className="mt-1 text-[10px] text-white/65">{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {['REACT', 'NODE', 'TS'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2 py-1 font-mono text-[6.5px] tracking-[0.1em] text-white/35"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <SocialLinks iconClassName="h-6 w-6 justify-center rounded-full border border-white/[0.08] bg-white/[0.02]" />
              </div>
            </div>

            <div className="relative flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-white/20">
                G/OS — DIGITAL CRAFTSMANSHIP
              </span>
              <span className="font-mono text-[6.5px] tracking-[0.12em] text-white/25">13.7563° N</span>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}
