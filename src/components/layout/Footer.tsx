import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { site } from '@/lib/data'
import { scrollToId } from '@/lib/utils'
import { useLocalTime } from '@/hooks/useLocalTime'
import { Logo, LogoMark } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { Marquee } from '@/components/ui/Marquee'

const footerNav = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const marqueeItems = [
  'AVAILABLE FOR SELECT PROJECTS',
  'LET’S BUILD SOMETHING EXCEPTIONAL',
  'BANGKOK — WORKING WORLDWIDE',
]

export function Footer() {
  const localTime = useLocalTime(site.timezone, false)

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.07] bg-ink">
      <div className="pointer-events-none absolute -right-[12%] -top-[34%] h-[38vw] w-[38vw] rounded-full bg-electric/[0.06] blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-[10%] top-[18%] h-[24vw] w-[24vw] rounded-full bg-violet/[0.035] blur-[100px]" aria-hidden="true" />

      <div className="relative border-b border-white/[0.06] bg-white/[0.012] py-4">
        <Marquee
          items={marqueeItems}
          duration={34}
          itemClassName="!text-[9px] !font-mono !tracking-[0.24em] !text-white/30 !px-8"
          separator={<ArrowUpRight className="h-2.5 w-2.5 text-electric/50" strokeWidth={1.5} />}
        />
      </div>

      <div className="container-page relative">
        <div className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Logo markSize={34} />
            <p className="mt-6 max-w-[21rem] text-[0.82rem] leading-relaxed text-mist">
              Full-stack developer and creative engineer building digital products with precision,
              personality, and a point of view.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              <span className="mono text-white/30">OPEN FOR NEW PROJECTS</span>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="group mt-7 inline-flex items-center gap-2 text-[13px] text-white/65 transition-colors hover:text-white"
            >
              {site.email}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="mono mb-5 text-white/20">SITEMAP</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToId(item.href)
                    }}
                    className="group flex w-fit items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white"
                  >
                    {item.label}
                    <span className="h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mono mb-5 text-white/20">ELSEWHERE</p>
            <SocialLinks showLabels className="flex-wrap gap-2" />
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="mono text-white/20">BASED IN</span>
                <span className="text-[10px] text-white/40">Bangkok, TH</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="mono text-white/20">LOCAL TIME</span>
                <span className="font-mono text-[10px] text-white/40 tabular-nums">BKK {localTime}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="mono text-white/20">COORDINATES</span>
                <span className="font-mono text-[9px] text-white/40">13.7563° N</span>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative border-t border-white/[0.07] pt-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => scrollToId('home')}
            aria-label="Back to top"
            data-cursor-label="Back to top"
            className="block w-full select-none text-center"
          >
            <span className="display block whitespace-nowrap bg-gradient-to-b from-white/[0.26] via-white/[0.10] to-white/[0.005] bg-clip-text text-[clamp(3.6rem,16.4vw,16rem)] font-medium uppercase leading-[0.78] tracking-[-0.07em] text-transparent transition-all duration-700 group-hover:from-electric/[0.42] group-hover:via-violet/[0.18] group-hover:to-transparent">
              GOSOGOOD
            </span>
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2">
              <LogoMark size={14} />
              <span className="mono text-white/20">© {new Date().getFullYear()} GOSOGOOD</span>
            </span>
            <span className="hidden h-2.5 w-px bg-white/10 sm:block" />
            <span className="mono text-white/15">DESIGNED &amp; BUILT WITH INTENT</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="mono hidden text-white/15 md:block">V1.0 — BKK</span>
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="group flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.02] py-1.5 pl-3 pr-1.5 text-[9px] uppercase tracking-[0.14em] text-white/35 transition-colors hover:border-white/20 hover:text-white"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
