import { ArrowUpRight, Sparkles } from 'lucide-react'
import { principles, site, stats } from '@/lib/data'
import { scrollToId } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { TiltCard } from '@/components/ui/TiltCard'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function About() {
  return (
    <section id="about" className="section-space relative">
      <div className="container-page relative z-10">
        <SectionHeader
          index="02"
          label="About"
          meta="THE PERSON BEHIND THE PIXELS"
          title={
            <>
              <span className="block">
                <SplitText text="Engineer by craft." />
              </span>
              <span className="block">
                <SplitText text="Designer by instinct." wordClassName="text-gradient" delay={0.15} />
              </span>
            </>
          }
          description="Five years of turning complex problems into calm, considered products — and still fascinated by the details."
        />

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Story */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="glass hover-spotlight relative flex h-full flex-col rounded-[24px] p-7 sm:p-9 lg:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="mono text-electric/60">02.1</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span className="mono text-white/30">THE SHORT VERSION</span>
                </div>
                <span className="mono text-white/15">EST. 2020</span>
              </div>

              <h3 className="display mt-9 max-w-[30rem] text-[clamp(1.65rem,3vw,2.4rem)] leading-[1.08] tracking-[-0.035em] text-pearl">
                I build for the moment a product stops feeling like software — and starts feeling{' '}
                <span className="text-white/35">inevitable.</span>
              </h3>

              <div className="mt-7 max-w-[34rem] space-y-5 text-[0.9rem] leading-[1.8] text-mist">
                <p>
                  I&apos;m GOSOGOOD, a full-stack developer based in Bangkok. My path started in 2020 with a
                  browser, a stubborn curiosity, and one question: how does this thing actually work?
                </p>
                <p>
                  Five years, 48 products, and a few thousand late-night commits later, the answer keeps
                  getting more interesting. I&apos;ve shipped for SaaS, commerce, and fintech teams — but the
                  approach hasn&apos;t changed. Understand the problem deeply. Remove what doesn&apos;t earn its
                  place. Sweat the details where design and engineering meet.
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-9">
                <div>
                  <p className="mono mb-2 text-white/20">CURRENTLY</p>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/50" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </span>
                    <p className="text-[13px] text-white/65">{site.availability}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
                >
                  Start a conversation
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-white/25 group-hover:bg-white/[0.05]">
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Profile */}
          <Reveal className="lg:col-span-5" delay={0.14}>
            <TiltCard maxTilt={3} className="h-full">
              <div className="glass relative flex h-full flex-col overflow-hidden rounded-[24px] p-2.5">
                <div className="relative h-[268px] overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#090B11]">
                  <div
                    className="absolute inset-0 bg-grid-lines bg-[size:32px_32px] opacity-40"
                    style={{
                      maskImage: 'radial-gradient(ellipse at 50% 55%, black, transparent 78%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black, transparent 78%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-electric/[0.14] via-transparent to-violet/[0.12]" />
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08] animate-spin-slow" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="display block select-none text-[10.5rem] leading-none tracking-[-0.08em] text-outline opacity-50">
                      G
                    </span>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md">
                      <div
                        className="h-10 w-10 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle at 32% 24%, #fff 0%, #bccbff 16%, #6e89ff 42%, #3f2cc2 72%, #0b0d18 100%)',
                          boxShadow: 'inset -4px -6px 12px rgba(0,0,0,.6), 0 10px 30px -6px rgba(91,140,255,.65)',
                        }}
                      />
                      <span className="absolute -right-1 top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className="mono text-[8px] text-white/30">G/OS — PROFILE</span>
                    <span className="mono text-[8px] text-white/20">2026 / 001</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#090B11] via-[#090B11]/70 to-transparent p-4 pt-12">
                    <div>
                      <p className="mono text-[7.5px] text-electric/60">CREATIVE ENGINEER</p>
                      <p className="display mt-1 text-xl uppercase tracking-[-0.03em] text-pearl">GOSOGOOD</p>
                    </div>
                    <span className="mono flex items-center gap-1.5 text-[7.5px] text-white/25">
                      <Sparkles className="h-3 w-3 text-electric/60" strokeWidth={1.5} />
                      BKK
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mono mb-1.5 text-white/20">ROLE</p>
                      <p className="text-sm text-white/70">Full-Stack Developer</p>
                    </div>
                    <div className="text-right">
                      <p className="mono mb-1.5 text-white/20">LOCATION</p>
                      <p className="text-sm text-white/70">Bangkok, TH</p>
                    </div>
                  </div>

                  <div className="my-5 h-px w-full bg-white/[0.07]" />

                  <p className="text-[0.8rem] leading-relaxed text-mist">
                    Designing and building digital products with an obsession for systems, speed, and the
                    small details people feel.
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <SocialLinks iconClassName="h-7 w-7 justify-center rounded-full border border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]" />
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
                    >
                      Email me
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Stats strip */}
          <Reveal className="lg:col-span-12" delay={0.06}>
            <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.018] md:grid-cols-4 md:divide-x md:divide-white/[0.07]">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative border-white/[0.07] p-6 transition-colors duration-500 hover:bg-white/[0.025] md:p-7 lg:p-8 [&:nth-child(odd)]:border-r [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 [&:nth-child(odd)]:md:border-r-0"
                >
                  <div className="flex items-start justify-between">
                    <p className="display text-[clamp(2.2rem,4vw,3.1rem)] leading-none tracking-[-0.04em] text-pearl">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <span className="mono text-white/15">0{index + 1}</span>
                  </div>
                  <p className="mt-4 text-[12px] font-medium text-white/60">{stat.label}</p>
                  <p className="mono mt-1.5 text-[7.5px] text-white/20">{stat.note}</p>
                  <span className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-electric/50 to-transparent transition-transform duration-700 group-hover:scale-x-100 md:left-7 md:right-7" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Principles */}
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="glass relative h-full overflow-hidden rounded-[24px] p-7 sm:p-9">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="mono text-electric/60">02.2</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span className="mono text-white/30">PRINCIPLES</span>
                </div>
                <span className="mono text-white/15">NON-NEGOTIABLE</span>
              </div>

              <div className="divide-y divide-white/[0.07]">
                {principles.map((principle) => (
                  <div
                    key={principle.index}
                    className="group grid grid-cols-[28px_1fr] gap-4 py-6 first:pt-7 last:pb-1 sm:grid-cols-[40px_1fr_auto] sm:items-start"
                  >
                    <span className="font-mono text-[9px] text-white/20 transition-colors group-hover:text-electric/60">
                      {principle.index}
                    </span>
                    <div className="sm:max-w-[28rem]">
                      <h4 className="display text-lg tracking-[-0.02em] text-pearl/90 transition-colors group-hover:text-white">
                        {principle.title}
                      </h4>
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-mist">{principle.text}</p>
                    </div>
                    <span className="mt-1 hidden h-1.5 w-1.5 rounded-full bg-white/10 transition-all duration-500 group-hover:bg-electric group-hover:shadow-[0_0_10px_#5B8CFF] sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Manifesto */}
          <Reveal className="lg:col-span-5" delay={0.16}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.09] bg-gradient-to-br from-electric/[0.1] via-[#0A0C13] to-violet/[0.09] p-7 sm:p-9">
              <div
                className="absolute -right-6 -top-10 select-none font-display text-[11rem] leading-none text-white/[0.04]"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="mono text-electric/60">02.3</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span className="mono text-white/30">MANIFESTO</span>
                </div>
                <span className="mono text-white/15">G/OS</span>
              </div>

              <blockquote className="display relative mt-10 text-[clamp(1.7rem,3.1vw,2.35rem)] leading-[1.08] tracking-[-0.035em] text-pearl">
                Make it useful.
                <br />
                Make it fast.
                <br />
                <span className="text-white/35">Then make it beautiful.</span>
              </blockquote>

              <div className="mt-auto pt-9">
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {['CLARITY', 'CRAFT', 'MOMENTUM'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 font-mono text-[7.5px] tracking-[0.14em] text-white/35"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="mono text-[7.5px] text-white/20">THE APPROACH</p>
                    <p className="mt-1 text-[11px] text-white/50">Clarity first. Craft always.</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
