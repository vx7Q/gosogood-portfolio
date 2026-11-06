import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Command,
  Lock,
  MousePointer2,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectTheme } from '@/lib/data'

const urls: Record<ProjectTheme, string> = {
  blue: 'nebula.app/overview',
  violet: 'pulse.team/workspace',
  pearl: 'aurum.studio/collection',
}

const glow: Record<ProjectTheme, string> = {
  blue: 'from-electric/30 via-electric/5 to-violet/20',
  violet: 'from-violet/30 via-violet/5 to-electric/20',
  pearl: 'from-[#C9BDFF]/30 via-transparent to-[#7C6BFF]/20',
}

export function ProjectPreview({
  theme,
  className,
  interactive = false,
}: {
  theme: ProjectTheme
  className?: string
  interactive?: boolean
}) {
  return (
    <div className={cn('relative', className)}>
      <div
        className={cn('absolute -inset-6 rounded-[32px] bg-gradient-to-br opacity-60 blur-3xl', glow[theme])}
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0B0D14] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]',
          interactive && 'transition-transform duration-700 ease-expo group-hover:scale-[1.012]',
        )}
      >
        {/* Browser chrome */}
        <div className="relative flex h-8 items-center gap-2 border-b border-white/[0.07] bg-[#0D0F16] px-3 sm:h-9">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-[3px] sm:px-5">
            <Lock className="h-2 w-2 text-white/25" strokeWidth={2} />
            <span className="font-mono text-[7px] tracking-[0.02em] text-white/35">{urls[theme]}</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-white/15" />
            <span className="h-1 w-1 rounded-full bg-white/15" />
          </div>
        </div>

        <div className="preview-container relative aspect-[16/10] w-full overflow-hidden" aria-hidden="true">
          {theme === 'blue' && <NebulaPreview />}
          {theme === 'pearl' && <AurumPreview />}
          {theme === 'violet' && <PulsePreview />}

          {/* Glass reflection */}
          <div
            className="pointer-events-none absolute inset-0 z-30 opacity-40"
            style={{
              background:
                'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 24%, transparent 72%, rgba(255,255,255,0.03) 100%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

function NebulaPreview() {
  return (
    <div className="relative flex h-full w-full bg-[#070A13] text-white">
      <div className="pointer-events-none absolute -right-[8%] -top-[30%] h-[75%] w-[55%] rounded-full bg-[#2E5BFF]/[0.14] blur-[40px]" />
      <div className="pointer-events-none absolute -bottom-[30%] left-[20%] h-[60%] w-[50%] rounded-full bg-[#7C4DFF]/[0.08] blur-[50px]" />

      {/* Sidebar */}
      <div className="relative z-10 flex h-full w-[16.5%] shrink-0 flex-col border-r border-white/[0.055] bg-[#080B14]/80 p-[2.8%]">
        <div className="flex items-center gap-[4%]">
          <span className="flex aspect-square w-[28%] items-center justify-center rounded-[22%] bg-gradient-to-br from-[#6D96FF] to-[#8B5CF6]">
            <span className="pv-2xs font-bold text-white">N</span>
          </span>
          <span className="pv-xs font-medium tracking-[0.08em] text-white/80">nebula</span>
        </div>

        <div className="mt-[17%] flex flex-col gap-[6%]">
          {[
            { label: 'Overview', active: true },
            { label: 'Analytics', active: false },
            { label: 'Reports', active: false },
            { label: 'Customers', active: false },
            { label: 'Automations', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-[7%] rounded-md px-[8%] py-[5%]',
                item.active ? 'bg-white/[0.07] text-white/85' : 'text-white/30',
              )}
            >
              <span className={cn('aspect-square w-[13%] rounded-[3px]', item.active ? 'bg-[#6D96FF]' : 'bg-white/20')} />
              <span className="pv-3xs">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[15%]">
          <p className="pv-3xs mb-[7%] uppercase tracking-[0.14em] text-white/20">Projects</p>
          {['Orbit v2', 'Atlas CRM', 'Halo'].map((item) => (
            <div key={item} className="mb-[6%] flex items-center gap-[7%] text-white/30">
              <span className="aspect-square w-[7%] rounded-full border border-white/25" />
              <span className="pv-3xs">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-md border border-white/[0.06] bg-white/[0.025] p-[8%]">
          <div className="flex items-center gap-[7%]">
            <span className="h-[5px] w-[5px] rounded-full bg-emerald-300" />
            <span className="pv-3xs text-white/50">All systems normal</span>
          </div>
          <div className="mt-[8%] h-[2px] w-full rounded-full bg-white/[0.06]">
            <div className="h-full w-[72%] rounded-full bg-emerald-300/60" />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 overflow-hidden p-[2.8%]">
        <div className="flex items-start justify-between">
          <div>
            <p className="pv-3xs uppercase tracking-[0.18em] text-white/25">Monday, 14 October</p>
            <p className="pv-lg mt-[2%] font-display font-medium tracking-[-0.02em] text-white/90">
              Good morning, Alex.
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-white/25">
              <Search className="h-2 w-2" strokeWidth={1.5} />
              <span className="pv-3xs">Search</span>
              <span className="pv-3xs ml-2 rounded border border-white/[0.07] px-[3px] text-white/20">⌘K</span>
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#9C87FF] to-[#4C65DB] pv-3xs font-medium text-white">
              A
            </span>
          </div>
        </div>

        <div className="mt-[3%] grid grid-cols-3 gap-[2%]">
          {[
            { label: 'Total revenue', value: '$128.4k', change: '+18.2%', points: '0,28 12,24 24,25 36,16 48,19 60,9 72,13 84,4' },
            { label: 'Active users', value: '8,429', change: '+6.4%', points: '0,26 12,20 24,22 36,18 48,10 60,14 72,6 84,8' },
            { label: 'Conversion', value: '4.82%', change: '+1.1%', points: '0,22 12,24 24,14 36,18 48,12 60,16 72,8 84,5' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-[7%]"
            >
              <p className="pv-3xs text-white/30">{stat.label}</p>
              <div className="mt-[6%] flex items-end justify-between gap-1">
                <p className="pv-md font-display font-medium tracking-[-0.02em] text-white/90">{stat.value}</p>
                <span className="flex items-center gap-[2px] rounded-full bg-emerald-300/[0.08] px-1 py-[1px] text-emerald-300/80">
                  <TrendingUp className="h-1.5 w-1.5" strokeWidth={2} />
                  <span className="pv-3xs">{stat.change}</span>
                </span>
              </div>
              <svg viewBox="0 0 84 32" className="mt-[8%] h-4 w-full" preserveAspectRatio="none" aria-hidden="true">
                <polyline
                  points={stat.points}
                  fill="none"
                  stroke="#6D96FF"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-[2%] grid grid-cols-[1.75fr_1fr] gap-[2%]">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-[4%]">
            <div className="flex items-start justify-between">
              <div>
                <p className="pv-3xs text-white/30">Revenue pulse</p>
                <div className="mt-[4%] flex items-baseline gap-2">
                  <span className="pv-md font-display font-medium tracking-[-0.02em] text-white/90">$128,420</span>
                  <span className="pv-3xs text-emerald-300/70">+18.2%</span>
                </div>
              </div>
              <span className="rounded border border-white/[0.07] px-1.5 py-0.5 pv-3xs text-white/30">Last 7 days</span>
            </div>

            <div className="relative mt-[3%]">
              <svg viewBox="0 0 320 115" className="h-[68px] w-full sm:h-[90px]" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="nebula-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[26, 54, 82].map((y) => (
                  <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 3" />
                ))}
                <path
                  d="M0 94 C18 90 28 78 46 81 S73 63 91 67 S115 50 133 56 S158 66 174 47 S200 32 218 39 S248 27 264 30 S296 14 320 18 L320 115 L0 115 Z"
                  fill="url(#nebula-chart)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  d="M0 94 C18 90 28 78 46 81 S73 63 91 67 S115 50 133 56 S158 66 174 47 S200 32 218 39 S248 27 264 30 S296 14 320 18"
                  fill="none"
                  stroke="#7FA2FF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="320" cy="18" r="2.6" fill="#7FA2FF" />
                <circle cx="320" cy="18" r="5" fill="#7FA2FF" opacity="0.18" />
              </svg>
              <div className="mt-[2%] flex justify-between pv-3xs text-white/20">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[#6D8DFF]/20 bg-gradient-to-br from-[#27346B]/45 to-[#131726]/80 p-[5%]">
            <div className="absolute -right-[20%] -top-[30%] h-[80%] w-[80%] rounded-full bg-[#7B5CFF]/20 blur-[24px]" />
            <div className="relative flex items-center gap-1.5">
              <Sparkles className="h-2.5 w-2.5 text-[#A8B9FF]" strokeWidth={1.5} />
              <span className="pv-3xs uppercase tracking-[0.18em] text-[#A8B9FF]/80">AI insight</span>
              <span className="pv-3xs ml-auto rounded border border-white/10 px-1 py-[1px] text-white/25">BETA</span>
            </div>
            <p className="relative mt-[8%] pv-sm font-display leading-[1.25] text-white/85">
              Launch traffic converted 31% above baseline.
            </p>
            <p className="relative mt-[5%] pv-3xs leading-relaxed text-white/35">
              Consider shifting 12% of paid budget toward the Tuesday window.
            </p>
            <div className="relative mt-[7%] flex flex-wrap gap-1">
              <span className="rounded-full bg-white/[0.06] px-1.5 py-[2px] pv-3xs text-white/40">Retention +12%</span>
              <span className="rounded-full bg-white/[0.06] px-1.5 py-[2px] pv-3xs text-white/40">CAC −8%</span>
            </div>
            <div className="relative mt-[8%] flex items-center justify-between rounded-md bg-white/[0.07] px-2 py-1.5">
              <span className="pv-3xs text-white/55">Apply suggestion</span>
              <ArrowUpRight className="h-2 w-2 text-white/40" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AurumPreview() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#EFE9DF] text-[#1A1720]">
      <div className="pointer-events-none absolute -right-[10%] -top-[30%] h-[90%] w-[55%] rounded-full bg-[#B7A3FF]/25 blur-[40px]" />

      <div className="relative z-10 flex items-center justify-between border-b border-black/[0.08] px-[4%] py-[2.3%]">
        <span className="font-display pv-sm font-medium tracking-[0.34em] text-[#1A1720]">AURUM</span>
        <div className="hidden items-center gap-[2.2vw] pv-3xs uppercase tracking-[0.2em] text-black/45 sm:flex">
          <span className="text-black/80">Collection</span>
          <span>Our story</span>
          <span>Journal</span>
        </div>
        <div className="flex items-center gap-[1.2vw] pv-3xs uppercase tracking-[0.14em] text-black/50">
          <span className="hidden sm:inline">Search</span>
          <span className="flex items-center gap-1">
            Bag <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#1A1720] pv-3xs text-[#EFE9DF]">2</span>
          </span>
        </div>
      </div>

      <div className="relative z-10 grid flex-1 grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-[7%] py-[3%]">
          <p className="pv-3xs uppercase tracking-[0.24em] text-black/35">No. 07 — Eau de parfum</p>
          <p className="font-serif pv-hero mt-[5%] leading-[0.98] tracking-[-0.03em] text-[#191620]">
            The art of
            <br />
            <span className="italic text-[#574D70]">quiet presence.</span>
          </p>
          <p className="mt-[6%] max-w-[90%] pv-3xs leading-[1.7] text-black/45">
            A study in smoked cedar, iris root, and soft leather. Composed in Grasse, bottled in
            small batches.
          </p>
          <div className="mt-[7%] flex items-center gap-[4%]">
            <span className="flex items-center justify-center rounded-full bg-[#191620] px-[7%] py-[3.5%] pv-3xs uppercase tracking-[0.16em] text-[#F4EFE8]">
              Add to bag — $185
            </span>
            <span className="pv-3xs uppercase tracking-[0.12em] text-black/35">50 ml</span>
          </div>
          <div className="mt-[9%] flex items-center gap-[5%] border-t border-black/[0.08] pt-[4%]">
            {['Complimentary shipping', 'Carbon neutral'].map((item) => (
              <span key={item} className="pv-3xs text-black/30">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden border-l border-black/[0.06] bg-[#E7E0D4]">
          <div className="absolute inset-0 bg-grid-lines bg-[size:40px_40px] opacity-[0.12]" />
          <div className="absolute h-[64%] w-[64%] rounded-full bg-gradient-to-br from-white/80 via-[#D6CBF0] to-[#8676A9] opacity-70 blur-[2px]" />
          <div className="absolute h-[58%] w-[58%] rounded-full border border-white/50" />
          <div className="absolute bottom-[12%] left-1/2 h-[5%] w-[40%] -translate-x-1/2 rounded-full bg-black/20 blur-md" />

          <div className="relative z-10 flex h-[62%] w-[30%] min-h-[84px] flex-col items-center">
            <div className="h-[11%] w-[44%] rounded-t-[3px] bg-gradient-to-r from-[#2A2532] via-[#4A4358] to-[#211D29] shadow-sm" />
            <div className="relative h-[89%] w-full overflow-hidden rounded-[38%_38%_16%_16%/14%_14%_8%_8%] bg-gradient-to-br from-[#E3DAEE] via-[#A999BE] to-[#4B3F5D] shadow-[0_20px_40px_-12px_rgba(34,24,52,0.65)]">
              <div className="absolute left-[12%] top-[6%] h-[80%] w-[16%] rounded-full bg-white/35 blur-[4px]" />
              <div className="absolute inset-x-[18%] top-[38%] rounded-[2px] border border-white/40 bg-[#F3EDE3]/90 py-[9%] text-center">
                <p className="font-display pv-3xs tracking-[0.3em] text-[#2A2532]">AURUM</p>
                <p className="pv-3xs mt-[6%] tracking-[0.14em] text-black/45">ORPHEUS · 07</p>
              </div>
              <div className="absolute bottom-[9%] left-1/2 h-[4px] w-[36%] -translate-x-1/2 rounded-full bg-white/25" />
            </div>
          </div>

          <span className="absolute right-[8%] top-[8%] rounded-full border border-black/10 bg-white/40 px-2 py-1 pv-3xs uppercase tracking-[0.16em] text-black/45 backdrop-blur-sm">
            Bestseller
          </span>
          <span className="absolute bottom-[8%] left-[8%] pv-3xs uppercase tracking-[0.18em] text-black/30">
            Orpheus — 50ml
          </span>
          <div className="absolute bottom-[8%] right-[8%] flex items-center gap-1 pv-3xs text-black/35">
            <span className="h-2 w-2 rounded-full bg-[#6D5B97]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C9A9]" />
            <span className="h-2 w-2 rounded-full bg-[#C8CEDB]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-4 gap-[1%] border-t border-black/[0.07] px-[4%] py-[2%]">
        {[
          { name: 'Orpheus', tone: 'from-[#B9A9D4] to-[#5B4B78]' },
          { name: 'Velour', tone: 'from-[#D8C6AA] to-[#83694C]' },
          { name: 'Iris No. 3', tone: 'from-[#BFC8DB] to-[#6A7691]' },
          { name: 'Discover all', tone: 'from-[#EDE7DE] to-[#D7CDBF]' },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-[7%]">
            <span className={cn('block h-5 w-4 rounded-[2px] bg-gradient-to-br', item.tone)} />
            <span className="pv-3xs uppercase tracking-[0.1em] text-black/40">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PulsePreview() {
  return (
    <div className="relative flex h-full w-full bg-[#080A11] text-white">
      <div className="pointer-events-none absolute -left-[10%] top-[20%] h-[60%] w-[40%] rounded-full bg-[#7C4DFF]/10 blur-[50px]" />

      {/* Sidebar */}
      <div className="relative z-10 flex h-full w-[17%] shrink-0 flex-col border-r border-white/[0.055] bg-[#0A0C14] p-[2.8%]">
        <div className="flex items-center gap-[5%]">
          <span className="relative flex aspect-square w-[24%] items-center justify-center rounded-full border border-[#A78BFA]/40">
            <span className="aspect-square w-[38%] rounded-full bg-[#A78BFA]" />
          </span>
          <span className="pv-xs font-medium tracking-[0.14em] text-white/80">PULSE</span>
        </div>

        <div className="mt-[16%] flex items-center gap-[6%] rounded-md border border-white/[0.06] bg-white/[0.03] p-[6%]">
          <span className="flex aspect-square w-[22%] items-center justify-center rounded bg-gradient-to-br from-[#8B5CF6] to-[#5B8CFF] pv-3xs font-medium">
            A
          </span>
          <div className="min-w-0">
            <p className="pv-3xs truncate text-white/55">Acme Studio</p>
            <p className="pv-3xs text-white/20">12 members</p>
          </div>
        </div>

        <div className="mt-[12%] flex flex-col gap-[4%]">
          {[
            { label: 'Home', active: false },
            { label: 'My tasks', active: false },
            { label: 'Projects', active: true },
            { label: 'Inbox', active: false },
            { label: 'Docs', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-[7%] rounded px-[8%] py-[4%]',
                item.active ? 'bg-[#7C5CFF]/15 text-[#C4B5FD]' : 'text-white/25',
              )}
            >
              <span className={cn('aspect-square w-[11%] rounded-full border', item.active ? 'border-[#A78BFA] bg-[#A78BFA]/30' : 'border-white/20')} />
              <span className="pv-3xs">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <p className="pv-3xs mb-[6%] uppercase tracking-[0.14em] text-white/15">Spaces</p>
          {[
            { name: 'Website launch', color: '#5B8CFF' },
            { name: 'Mobile app', color: '#A78BFA' },
            { name: 'Brand refresh', color: '#34D399' },
          ].map((space) => (
            <div key={space.name} className="mb-[5%] flex items-center gap-[7%]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: space.color }} />
              <span className="pv-3xs text-white/30">{space.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main board */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.055] px-[3.2%] py-[2%]">
          <div className="flex items-center gap-[1.5%]">
            <span className="pv-sm font-medium text-white/80">Website launch</span>
            <span className="rounded border border-white/[0.07] px-1.5 py-[2px] pv-3xs uppercase tracking-[0.1em] text-white/25">
              Sprint 04
            </span>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="flex -space-x-1.5">
              {['from-[#8B5CF6] to-[#4C1D95]', 'from-[#5B8CFF] to-[#1E3A8A]', 'from-[#34D399] to-[#065F46]'].map((gradient) => (
                <span
                  key={gradient}
                  className={cn('h-4 w-4 rounded-full border border-[#080A11] bg-gradient-to-br', gradient)}
                />
              ))}
            </div>
            <span className="ml-1 flex items-center gap-1 rounded bg-[#7C5CFF] px-2 py-1 pv-3xs font-medium text-white">
              <Plus className="h-1.5 w-1.5" strokeWidth={3} />
              Share
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded border border-white/10 text-white/30">
              <Command className="h-1.5 w-1.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-[1.5%] border-b border-white/[0.045] px-[3.2%] py-[1.5%]">
          {['Board', 'List', 'Timeline', 'Calendar'].map((tab, index) => (
            <span
              key={tab}
              className={cn(
                'pv-3xs px-1.5 py-1',
                index === 0 ? 'rounded bg-white/[0.06] text-white/70' : 'text-white/20',
              )}
            >
              {tab}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1 pv-3xs text-white/20">
            <Search className="h-2 w-2" strokeWidth={1.5} /> Filter
          </span>
        </div>

        <div className="relative grid min-h-0 flex-1 grid-cols-3 gap-[2%] p-[2.4%]">
          {[
            {
              title: 'Backlog',
              count: 4,
              dot: '#64748B',
              cards: [
                { tag: 'Research', color: '#94A3B8', title: 'Audit current onboarding drop-off', progress: 20, avatars: ['from-[#5B8CFF] to-[#1E3A8A]'] },
                { tag: 'Content', color: '#A78BFA', title: 'Draft launch narrative & messaging', progress: 0, avatars: ['from-[#A78BFA] to-[#4C1D95]'] },
              ],
            },
            {
              title: 'In progress',
              count: 3,
              dot: '#5B8CFF',
              cards: [
                { tag: 'Design', color: '#5B8CFF', title: 'Homepage hero — final polish', progress: 68, avatars: ['from-[#5B8CFF] to-[#1E3A8A]', 'from-[#A78BFA] to-[#4C1D95]'] },
                { tag: 'Engineering', color: '#34D399', title: 'Wire up analytics events', progress: 45, avatars: ['from-[#34D399] to-[#065F46]'] },
              ],
            },
            {
              title: 'Review',
              count: 2,
              dot: '#A78BFA',
              cards: [
                { tag: 'Engineering', color: '#F59E0B', title: 'Ship responsive QA fixes', progress: 92, avatars: ['from-[#F59E0B] to-[#78350F]'] },
              ],
            },
          ].map((column) => (
            <div key={column.title} className="flex min-w-0 flex-col rounded-lg border border-white/[0.05] bg-white/[0.018] p-[4%]">
              <div className="mb-[5%] flex items-center gap-[4%]">
                <span className="h-[4px] w-[4px] rounded-full" style={{ backgroundColor: column.dot }} />
                <span className="pv-3xs uppercase tracking-[0.12em] text-white/45">{column.title}</span>
                <span className="pv-3xs rounded bg-white/[0.05] px-1 text-white/25">{column.count}</span>
                <Plus className="ml-auto h-2 w-2 text-white/20" strokeWidth={1.5} />
              </div>

              <div className="space-y-[4%]">
                {column.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-md border border-white/[0.06] bg-[#0D1019] p-[6%] shadow-sm"
                  >
                    <span
                      className="inline-block rounded px-1 py-[2px] pv-3xs font-medium uppercase tracking-[0.08em]"
                      style={{ color: card.color, backgroundColor: `${card.color}14` }}
                    >
                      {card.tag}
                    </span>
                    <p className="mt-[5%] pv-xs leading-[1.35] text-white/65">{card.title}</p>
                    <div className="mt-[7%] h-[2px] w-full rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${card.progress || 8}%`, backgroundColor: card.color, opacity: 0.7 }}
                      />
                    </div>
                    <div className="mt-[5%] flex items-center justify-between">
                      <div className="flex -space-x-1">
                        {card.avatars.map((avatar) => (
                          <span
                            key={avatar}
                            className={cn('h-3.5 w-3.5 rounded-full border border-[#0D1019] bg-gradient-to-br', avatar)}
                          />
                        ))}
                      </div>
                      <span className="pv-3xs text-white/20">{card.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Realtime cursors */}
          <div className="pointer-events-none absolute right-[8%] top-[38%] z-20 flex items-center">
            <MousePointer2 className="h-3 w-3 rotate-[-15deg] fill-[#8B5CF6] text-[#8B5CF6]" />
            <span className="ml-0.5 rounded-full bg-[#8B5CF6] px-1.5 py-[2px] pv-3xs font-medium text-white">
              Kai
            </span>
          </div>
          <div className="pointer-events-none absolute bottom-[16%] left-[42%] z-20 flex items-center">
            <MousePointer2 className="h-2.5 w-2.5 rotate-[-10deg] fill-[#5B8CFF] text-[#5B8CFF]" />
            <span className="ml-0.5 rounded-full bg-[#5B8CFF] px-1.5 py-[2px] pv-3xs font-medium text-white">
              Mint
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
