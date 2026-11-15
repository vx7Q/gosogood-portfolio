import { cn } from '@/lib/utils'
import type { ProjectId } from '@/lib/data'

interface ProjectPreviewProps {
  id: ProjectId
  className?: string
}

export function ProjectPreview({ id, className }: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        'preview-shell relative aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-pearl/[0.09] bg-[#07080C]',
        className,
      )}
    >
      {id === 'portfolio' && <PortfolioPreview />}
      {id === 'passforge' && <PassForgePreview />}
      {id === 'warp' && <WarpPreview />}
      {id === 'landing' && <LandingPreview />}
    </div>
  )
}

function BrowserBar({ url, tag = 'LIVE' }: { url: string; tag?: string }) {
  return (
    <div className="relative z-20 flex h-[9%] items-center gap-[2cqw] border-b border-pearl/[0.07] bg-pearl/[0.015] px-[3.5cqw]">
      <div className="flex gap-[0.8cqw]" aria-hidden="true">
        <span className="h-[1cqw] w-[1cqw] rounded-full bg-pearl/15" />
        <span className="h-[1cqw] w-[1cqw] rounded-full bg-pearl/15" />
        <span className="h-[1cqw] w-[1cqw] rounded-full bg-electric/60" />
      </div>
      <div className="mx-auto flex items-center gap-[1.1cqw] rounded-full border border-pearl/[0.08] bg-pearl/[0.03] px-[2.6cqw] py-[0.65cqw]">
        <span className="h-[0.75cqw] w-[0.75cqw] rounded-full bg-electric/70" />
        <span className="font-mono text-[0.95cqw] text-pearl/35">{url}</span>
      </div>
      <span className="w-[5cqw] text-right font-mono text-[0.8cqw] text-pearl/20">{tag}</span>
    </div>
  )
}

function PortfolioPreview() {
  return (
    <div className="flex h-full flex-col">
      <BrowserBar url="gosogood.xyz" />
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-lines opacity-50"
          style={{ backgroundSize: '4.5cqw 4.5cqw' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-pearl/[0.06] px-[4cqw] py-[1.7cqw]">
            <div className="flex items-center gap-[0.9cqw]">
              <span className="relative flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-full border border-electric/50">
                <span className="h-[0.5cqw] w-[0.5cqw] rounded-full bg-electric" />
              </span>
              <span className="text-[1.35cqw] font-semibold tracking-[-0.03em] text-pearl">
                <span className="text-electric">_</span>gosogood
              </span>
            </div>
            <div className="hidden items-center gap-[2cqw] font-mono text-[0.9cqw] uppercase tracking-[0.1em] text-pearl/30 sm:flex">
              <span>Work</span>
              <span>About</span>
              <span>Journey</span>
              <span>Contact</span>
            </div>
            <span className="rounded-full border border-pearl/[0.12] px-[1.8cqw] py-[0.55cqw] text-[0.85cqw] uppercase tracking-[0.1em] text-pearl/55">
              Say hello
            </span>
          </div>

          <div className="grid flex-1 grid-cols-12 gap-[2cqw] px-[4cqw] pb-[4cqw] pt-[3.4cqw]">
            <div className="col-span-7">
              <div className="flex items-center gap-[1cqw]">
                <span className="font-mono text-[0.85cqw] uppercase tracking-[0.16em] text-pearl/25">
                  Portfolio — 2026
                </span>
                <span className="h-px w-[2.5cqw] bg-pearl/20" />
                <span className="font-mono text-[0.85cqw] uppercase tracking-[0.16em] text-electric-soft/60">
                  Web since M.3
                </span>
              </div>

              <p className="mt-[1.7cqw] font-display text-[8.6cqw] font-medium uppercase leading-[0.84] tracking-[-0.06em] text-pearl">
                <span className="block text-outline">Still in</span>
                <span className="block">School</span>
                <span className="mt-[0.5cqw] block font-serif text-[9.4cqw] font-normal italic lowercase leading-[0.8] tracking-[-0.04em] text-gradient">
                  still building.
                </span>
              </p>

              <p className="mt-[2.2cqw] max-w-[34cqw] text-[1.55cqw] leading-[1.6] text-pearl/40">
                A student in Suphan Buri, learning in public — one honest project at a time.
              </p>

              <div className="mt-[2.4cqw] flex items-center gap-[1.1cqw]">
                <span className="inline-flex items-center gap-[0.7cqw] rounded-full bg-pearl px-[2.1cqw] py-[1cqw] text-[1.05cqw] font-medium text-ink">
                  See work <span className="text-[1.1cqw]">↗</span>
                </span>
                <span className="inline-flex items-center gap-[0.7cqw] rounded-full border border-pearl/[0.14] px-[2.1cqw] py-[1cqw] text-[1.05cqw] text-pearl/55">
                  Say hi <span className="text-[1.1cqw]">↗</span>
                </span>
              </div>
            </div>

            <div className="col-span-5 flex items-start justify-end">
              <div className="w-full rounded-[2cqw] border border-pearl/[0.1] bg-[#090B11]/[0.90] p-[1.6cqw] shadow-[0_2cqw_6cqw_-2cqw_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between border-b border-pearl/[0.07] pb-[1.2cqw]">
                  <span className="font-mono text-[0.65cqw] uppercase tracking-[0.16em] text-pearl/25">
                    Identity / 2026
                  </span>
                  <span className="flex items-center gap-[0.5cqw] font-mono text-[0.65cqw] uppercase tracking-[0.12em] text-electric-soft/60">
                    <span className="h-[0.4cqw] w-[0.4cqw] rounded-full bg-electric" /> Studying
                  </span>
                </div>
                <div className="mt-[1.5cqw] flex items-start justify-between gap-[1cqw]">
                  <div
                    className="flex h-[6.2cqw] w-[6.2cqw] items-center justify-center rounded-full text-[2.4cqw] text-pearl/80"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 22%, #ffffff 0%, #dfe6ff 10%, #b7c4ff 20%, #7a97ff 38%, #3b4fc4 58%, #151a3a 78%, #07090d 100%)',
                      boxShadow: 'inset -0.6cqw -0.8cqw 1.8cqw rgba(0,0,0,0.7)',
                    }}
                  >
                    _
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-[0.4cqw] rounded-full border border-electric/20 bg-electric/[0.05] px-[0.9cqw] py-[0.45cqw] font-mono text-[0.55cqw] uppercase tracking-[0.08em] text-electric-soft/65">
                      <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric" /> Not for hire
                    </span>
                    <p className="mt-[1cqw] font-mono text-[0.55cqw] text-pearl/20">SUPHAN BURI · TH</p>
                  </div>
                </div>
                <p className="mt-[1.4cqw] text-[1.45cqw] font-medium tracking-[-0.03em] text-pearl">
                  <span className="text-electric">_</span>gosogood
                </p>
                <p className="mt-[0.3cqw] text-[0.75cqw] text-pearl/35">Student / front-end learner</p>
                <div className="mt-[1.2cqw] grid grid-cols-2 gap-px overflow-hidden rounded-[0.7cqw] border border-pearl/[0.07] bg-pearl/[0.06]">
                  {[
                    ['BASE', 'Suphan Buri'],
                    ['FOCUS', 'Front-end'],
                    ['SCHOOL', 'Songphinong'],
                    ['STATUS', 'Studying'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0B0E14] px-[0.9cqw] py-[0.7cqw]">
                      <p className="font-mono text-[0.45cqw] uppercase tracking-[0.14em] text-pearl/20">{label}</p>
                      <p className="mt-[0.2cqw] text-[0.7cqw] text-pearl/55">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-pearl/[0.06] px-[4cqw] py-[1.3cqw]">
            <span className="font-mono text-[0.65cqw] uppercase tracking-[0.14em] text-pearl/20">
              Currently studying — not taking work
            </span>
            <span className="font-mono text-[0.65cqw] text-pearl/20">SCROLL ↓</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PassForgePreview() {
  return (
    <div className="flex h-full flex-col">
      <BrowserBar url="pass-forge-pro.netlify.app" />

      <div className="relative flex-1 overflow-hidden bg-[#080A0F]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 50% 0%, rgba(110,139,255,0.14), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col px-[3.2cqw] pb-[2.4cqw]">
          <div className="flex items-center justify-between border-b border-pearl/[0.07] py-[1.3cqw]">
            <div className="flex items-center gap-[0.9cqw]">
              <span className="flex h-[2.1cqw] w-[2.1cqw] items-center justify-center rounded-[0.55cqw] bg-gradient-to-br from-electric-soft to-electric text-ink">
                <svg viewBox="0 0 24 24" fill="none" className="h-[1.1cqw] w-[1.1cqw]" aria-hidden="true">
                  <path
                    d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12v10H6z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[1.2cqw] font-semibold tracking-[-0.03em] text-pearl">PassForge</span>
              <span className="rounded-full border border-pearl/[0.1] px-[0.8cqw] py-[0.2cqw] font-mono text-[0.55cqw] text-pearl/35">
                v2.3
              </span>
            </div>
            <span className="rounded-full border border-pearl/[0.1] px-[1.2cqw] py-[0.45cqw] font-mono text-[0.55cqw] uppercase tracking-[0.1em] text-pearl/45">
              Download tool
            </span>
          </div>

          <div className="mt-[1.5cqw] flex min-h-0 flex-1 gap-[2cqw]">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-end justify-between gap-[1.5cqw]">
                <div>
                  <p className="font-mono text-[0.55cqw] uppercase tracking-[0.18em] text-electric-soft/55">
                    Password &amp; passphrase generator
                  </p>
                  <p className="mt-[0.55cqw] font-display text-[2.55cqw] font-medium leading-[0.95] tracking-[-0.04em] text-pearl">
                    Generate something <span className="font-serif italic text-gradient">unbreakable.</span>
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-[0.4cqw] rounded-full border border-electric/20 bg-electric/[0.06] px-[1cqw] py-[0.4cqw] font-mono text-[0.5cqw] uppercase tracking-[0.1em] text-electric-soft/70">
                  <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric" /> Local only
                </span>
              </div>

              <div className="mt-[1.1cqw] rounded-[1.2cqw] border border-pearl/[0.1] bg-[#0B0E14]/[0.95] p-[1.3cqw] shadow-[0_2cqw_5cqw_-2cqw_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-[0.45cqw] rounded-full border border-pearl/[0.08] bg-pearl/[0.03] p-[0.3cqw] text-[0.62cqw]">
                  <span className="rounded-full bg-pearl px-[1.2cqw] py-[0.35cqw] font-medium text-ink">Password</span>
                  <span className="px-[1cqw] py-[0.35cqw] text-pearl/40">Passphrase</span>
                  <span className="ml-auto flex items-center gap-[0.4cqw] px-[0.7cqw] font-mono text-[0.5cqw] uppercase tracking-[0.1em] text-pearl/25">
                    <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric" /> Generated locally
                  </span>
                </div>

                <div className="mt-[0.9cqw] flex items-center justify-between gap-[1cqw] rounded-[0.8cqw] border border-electric/15 bg-electric/[0.04] px-[1.2cqw] py-[0.85cqw]">
                  <span className="truncate font-mono text-[1.35cqw] tracking-[0.02em] text-electric-soft">
                    vK9#mQ2!pL7@xR4$wT8&amp;nB3
                  </span>
                  <span className="flex shrink-0 items-center gap-[0.45cqw]">
                    <span className="flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-[0.4cqw] border border-pearl/[0.1] text-pearl/50">
                      <svg viewBox="0 0 24 24" fill="none" className="h-[0.85cqw] w-[0.85cqw]" aria-hidden="true">
                        <path
                          d="M8 8h11v11H8zM5 16V5h11"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-[0.4cqw] border border-pearl/[0.1] text-pearl/50">
                      <svg viewBox="0 0 24 24" fill="none" className="h-[0.85cqw] w-[0.85cqw]" aria-hidden="true">
                        <path
                          d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </div>

                <div className="mt-[0.9cqw] grid grid-cols-2 gap-[1.1cqw]">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[0.5cqw] uppercase tracking-[0.1em] text-pearl/30">
                      <span>Length</span>
                      <span className="text-pearl/70">24</span>
                    </div>
                    <div className="relative mt-[0.65cqw] h-[0.4cqw] rounded-full bg-pearl/[0.08]">
                      <span className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-electric" />
                      <span className="absolute left-[62%] top-1/2 h-[0.95cqw] w-[0.95cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-electric shadow-[0_0_1cqw_rgba(110,139,255,0.7)]" />
                    </div>
                    <div className="mt-[0.55cqw] flex items-center gap-[0.35cqw]">
                      {[1, 2, 3, 4].map((bar) => (
                        <span
                          key={bar}
                          className="h-[0.35cqw] flex-1 rounded-full bg-electric"
                          style={{ opacity: 0.35 + bar * 0.16 }}
                        />
                      ))}
                      <span className="ml-[0.35cqw] font-mono text-[0.5cqw] uppercase tracking-[0.1em] text-electric-soft/65">
                        Strong
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap content-start gap-[0.35cqw]">
                    {['A-Z', 'a-z', '0-9', '!@#', 'No ambiguous'].map((option, index) => (
                      <span
                        key={option}
                        className={cn(
                          'rounded-full border px-[0.7cqw] py-[0.3cqw] font-mono text-[0.45cqw] uppercase tracking-[0.06em]',
                          index < 4
                            ? 'border-electric/20 bg-electric/[0.06] text-electric-soft/70'
                            : 'border-pearl/[0.08] text-pearl/30',
                        )}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-[0.9cqw] flex items-center justify-between gap-[1cqw] border-t border-pearl/[0.07] pt-[0.8cqw]">
                  <span className="font-mono text-[0.5cqw] uppercase tracking-[0.12em] text-pearl/20">
                    Batch <span className="text-pearl/45">01</span>
                  </span>
                  <span className="rounded-full bg-pearl px-[1.4cqw] py-[0.45cqw] text-[0.58cqw] font-medium text-ink">
                    Generate ↗
                  </span>
                </div>
              </div>

              <div className="mt-[0.9cqw] flex items-center justify-between">
                <span className="font-mono text-[0.5cqw] uppercase tracking-[0.12em] text-pearl/20">
                  No server · no account
                </span>
                <span className="font-mono text-[0.5cqw] uppercase tracking-[0.12em] text-pearl/30">
                  Download standalone HTML
                </span>
              </div>
            </div>

            <div className="flex w-[18.5cqw] shrink-0 flex-col rounded-[1.2cqw] border border-pearl/[0.08] bg-pearl/[0.015] p-[1.2cqw]">
              <div className="flex items-center justify-between border-b border-pearl/[0.07] pb-[0.8cqw]">
                <span className="font-mono text-[0.55cqw] uppercase tracking-[0.14em] text-pearl/30">
                  History / local
                </span>
                <span className="font-mono text-[0.5cqw] text-pearl/20">03</span>
              </div>
              <div className="mt-[0.7cqw] space-y-[0.55cqw]">
                {[
                  ['tR7!kL2@qW9#', '2 min ago'],
                  ['Moon-Falcon-River-42', '11 min ago'],
                  ['xP4$vN8&hK1!', '26 min ago'],
                ].map(([value, time]) => (
                  <div
                    key={value}
                    className="rounded-[0.65cqw] border border-pearl/[0.06] bg-[#0B0E14] px-[0.8cqw] py-[0.6cqw]"
                  >
                    <p className="truncate font-mono text-[0.6cqw] text-pearl/55">{value}</p>
                    <div className="mt-[0.25cqw] flex items-center justify-between">
                      <span className="font-mono text-[0.42cqw] uppercase tracking-[0.1em] text-pearl/20">
                        {time}
                      </span>
                      <span className="font-mono text-[0.42cqw] uppercase tracking-[0.1em] text-electric-soft/45">
                        Copy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-pearl/[0.07] pt-[0.8cqw]">
                <p className="font-mono text-[0.45cqw] uppercase leading-relaxed tracking-[0.1em] text-pearl/20">
                  Saved in this browser
                </p>
                <div className="mt-[0.5cqw] flex items-center justify-between">
                  <span className="font-mono text-[0.45cqw] uppercase tracking-[0.1em] text-pearl/30">
                    Clear all
                  </span>
                  <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WarpPreview() {
  return (
    <div className="flex h-full flex-col">
      <BrowserBar url="warp-exe.netlify.app" tag="ARCHIVE" />

      <div className="relative flex-1 overflow-hidden bg-[#06080C]">
        <div
          className="absolute inset-0 bg-grid-lines opacity-40"
          style={{ backgroundSize: '3.5cqw 3.5cqw' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 18% 0%, rgba(110,139,255,0.13), transparent 65%), radial-gradient(ellipse 50% 60% at 100% 100%, rgba(110,139,255,0.08), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(242,240,232,0.6) 0px, rgba(242,240,232,0.6) 1px, transparent 1px, transparent 4px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col px-[4cqw] pb-[2.6cqw]">
          <div className="flex items-center justify-between border-b border-pearl/[0.07] py-[1.4cqw]">
            <div className="flex items-center gap-[0.7cqw]">
              <span className="h-[1.2cqw] w-[1.2cqw] rotate-45 border border-electric bg-electric/20 shadow-[0_0_1.4cqw_rgba(110,139,255,0.55)]" />
              <span className="font-mono text-[1.1cqw] font-medium tracking-[0.04em] text-pearl">Warp.exe</span>
              <span className="ml-[0.6cqw] rounded-full border border-pearl/[0.1] px-[0.8cqw] py-[0.2cqw] font-mono text-[0.5cqw] uppercase tracking-[0.12em] text-pearl/30">
                Archive
              </span>
            </div>
            <div className="hidden items-center gap-[1.6cqw] font-mono text-[0.6cqw] uppercase tracking-[0.14em] text-pearl/30 sm:flex">
              <span>About</span>
              <span>Protection</span>
              <span>Commands</span>
              <span>Contact</span>
            </div>
            <span className="flex items-center gap-[0.45cqw] font-mono text-[0.55cqw] uppercase tracking-[0.1em] text-electric-soft/65">
              <span className="h-[0.4cqw] w-[0.4cqw] rounded-full bg-electric shadow-[0_0_0.8cqw_#6E8BFF]" /> Offline
            </span>
          </div>

          <div className="grid flex-1 grid-cols-12 items-center gap-[2.4cqw]">
            <div className="col-span-7">
              <p className="font-mono text-[0.6cqw] uppercase tracking-[0.2em] text-electric-soft/50">
                Discord security system
              </p>
              <p className="mt-[1cqw] font-display text-[4.6cqw] font-medium leading-[0.9] tracking-[-0.05em] text-pearl">
                Advanced
                <br />
                server <span className="font-serif italic text-gradient">protection.</span>
              </p>
              <p className="mt-[1.3cqw] max-w-[33cqw] text-[1.1cqw] leading-[1.6] text-pearl/40">
                Anti-raid, anti-nuke, auto moderation, and real-time logs — wrapped in a terminal.
              </p>

              <div className="mt-[1.8cqw] flex items-center gap-[0.9cqw]">
                <span className="inline-flex items-center gap-[0.6cqw] rounded-full bg-pearl px-[1.8cqw] py-[0.75cqw] text-[0.8cqw] font-medium text-ink">
                  View protection ↗
                </span>
                <span className="inline-flex items-center gap-[0.6cqw] rounded-full border border-pearl/[0.14] px-[1.7cqw] py-[0.75cqw] text-[0.8cqw] text-pearl/50">
                  Read about
                </span>
              </div>

              <div className="mt-[1.7cqw] flex items-center gap-[1.5cqw] border-t border-pearl/[0.07] pt-[1.1cqw]">
                {['24/7 monitoring', 'Realtime detection', 'Panic lockdown'].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-[0.45cqw] font-mono text-[0.55cqw] uppercase tracking-[0.08em] text-pearl/25"
                  >
                    <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric/70" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-5">
              <div className="rounded-[1.3cqw] border border-electric/15 bg-[#0A0D14]/[0.95] p-[1.4cqw] shadow-[0_2cqw_5cqw_-2cqw_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-pearl/[0.07] pb-[0.9cqw]">
                  <span className="font-mono text-[0.55cqw] uppercase tracking-[0.16em] text-pearl/25">
                    Security core
                  </span>
                  <span className="flex items-center gap-[0.4cqw] font-mono text-[0.5cqw] uppercase tracking-[0.1em] text-electric-soft/65">
                    <span className="h-[0.35cqw] w-[0.35cqw] rounded-full bg-electric" /> Active
                  </span>
                </div>

                <div className="mt-[1cqw] space-y-[0.6cqw]">
                  {[
                    ['Threat level', 'LOW', '18%'],
                    ['Shield', '99.9%', '92%'],
                    ['Auto mod', 'ON', '100%'],
                    ['Logs', 'LIVE', '76%'],
                  ].map(([label, value, width]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between font-mono text-[0.5cqw] uppercase tracking-[0.08em]">
                        <span className="text-pearl/25">{label}</span>
                        <span className="text-pearl/60">{value}</span>
                      </div>
                      <div className="mt-[0.3cqw] h-[0.3cqw] rounded-full bg-pearl/[0.07]">
                        <span className="block h-full rounded-full bg-electric/70" style={{ width }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-[1.1cqw] rounded-[0.7cqw] border border-pearl/[0.07] bg-pearl/[0.02] px-[0.8cqw] py-[0.7cqw]">
                  <p className="font-mono text-[0.5cqw] uppercase tracking-[0.12em] text-pearl/20">Latest event</p>
                  <p className="mt-[0.4cqw] font-mono text-[0.55cqw] leading-relaxed text-pearl/35">
                    <span className="text-electric-soft/70">[OK]</span> automod: blocked invite link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LandingPreview() {
  return (
    <div className="flex h-full flex-col">
      <BrowserBar url="vx7q.github.io/project" />
      <div className="relative flex flex-1 overflow-hidden">
        <ThemeHalf tone="dark" language="EN" />
        <div className="relative z-10 w-px bg-pearl/[0.12]" aria-hidden="true" />
        <ThemeHalf tone="light" language="TH" />
      </div>
    </div>
  )
}

function ThemeHalf({ tone, language }: { tone: 'dark' | 'light'; language: 'EN' | 'TH' }) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'relative flex flex-1 flex-col overflow-hidden px-[3.5cqw] py-[2.6cqw]',
        dark ? 'bg-[#07080C]' : 'bg-[#EDEAE2]',
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'text-[1.15cqw] font-semibold tracking-[-0.03em]',
            dark ? 'text-pearl' : 'text-[#14151B]',
          )}
        >
          <span className={dark ? 'text-electric' : 'text-[#3B4FC4]'}>/</span>project
        </span>
        <span
          className={cn(
            'rounded-full border px-[1.4cqw] py-[0.45cqw] font-mono text-[0.65cqw] uppercase tracking-[0.12em]',
            dark ? 'border-pearl/[0.1] text-pearl/35' : 'border-black/[0.12] text-black/35',
          )}
        >
          {language} <span className="opacity-45">/ ZH</span>
        </span>
      </div>

      {dark && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[
            ['18%', '22%', '0.35s'],
            ['72%', '18%', '1.1s'],
            ['60%', '64%', '0.7s'],
            ['30%', '78%', '1.5s'],
            ['84%', '48%', '0.2s'],
          ].map(([left, top, delay], index) => (
            <span
              key={index}
              className="animate-float absolute h-[0.5cqw] w-[0.5cqw] rounded-full bg-electric/60 shadow-[0_0_1cqw_rgba(110,139,255,0.8)]"
              style={{ left, top, animationDelay: delay }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <p
          className={cn(
            'font-mono text-[0.7cqw] uppercase tracking-[0.18em]',
            dark ? 'text-pearl/25' : 'text-black/35',
          )}
        >
          One page · two moods
        </p>
        <p
          className={cn(
            'mt-[1.2cqw] font-display text-[7.4cqw] font-medium uppercase leading-[0.82] tracking-[-0.06em]',
            dark ? 'text-pearl' : 'text-[#12131A]',
          )}
        >
          Make
          <br />
          it
          <br />
          yours<span className={dark ? 'text-electric' : 'text-[#3B4FC4]'}>.</span>
        </p>
        <div className="mt-[2cqw]">
          <span
            className={cn(
              'inline-flex items-center gap-[0.7cqw] rounded-full px-[1.7cqw] py-[0.8cqw] text-[1.1cqw] font-medium',
              dark ? 'bg-pearl text-ink' : 'bg-[#12131A] text-[#F5F6FA]',
            )}
          >
            Explore <span>↗</span>
          </span>
        </div>
      </div>

      <div
        className={cn(
          'relative z-10 flex items-center justify-between border-t pt-[1.2cqw] font-mono text-[0.6cqw] uppercase tracking-[0.14em]',
          dark ? 'border-pearl/[0.08] text-pearl/20' : 'border-black/[0.1] text-black/30',
        )}
      >
        <span>Theme / language</span>
        <span className={dark ? 'text-electric-soft/60' : 'text-[#3B4FC4]'}>
          {dark ? 'Dark' : 'Light'} mode
        </span>
      </div>
    </div>
  )
}
