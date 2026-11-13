import { ArrowUpRight } from 'lucide-react'
import { site } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { useLocalTime } from '@/hooks/useLocalTime'
import { Marquee } from '@/components/ui/Marquee'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Footer() {
  const localTime = useLocalTime()
  const { copy, format } = useI18n()
  const { footer, nav, common } = copy

  return (
    <footer className="relative overflow-hidden border-t border-pearl/[0.08]">
      <div className="border-b border-pearl/[0.08] bg-pearl/[0.015]">
        <Marquee
          items={footer.marquee}
          duration={48}
          itemClassName="text-pearl/20 text-[clamp(0.9rem,1.8vw,1.3rem)]"
        />
      </div>

      <div className="container-page relative z-10 pb-6 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#home" className="group inline-block" aria-label={common.logoAria}>
              <span className="display brand-wordmark block text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.82] tracking-[-0.07em] text-gradient">
                _gosogood
              </span>
            </a>
            <p className="mt-6 max-w-sm text-pretty text-[0.9rem] leading-[1.75] text-mist">
              {format(footer.bio, { age: site.age, school: common.schoolShort })}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              <span className="text-[11px] text-pearl/60">{common.availability}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="mono text-pearl/25">{footer.sitemap}</p>
              <ul className="mt-4 space-y-2.5">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[11px] text-pearl/45 transition-colors hover:text-pearl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono text-pearl/25">{footer.elsewhere}</p>
              <div className="mt-4 flex flex-col items-start gap-2">
                <SocialLinks showLabels className="flex-col items-start gap-2" />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="mono text-pearl/25">{footer.basedIn}</p>
              <dl className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3 border-b border-pearl/[0.07] pb-2.5">
                  <dt className="text-[10px] text-pearl/30">{footer.city}</dt>
                  <dd className="text-[10px] text-pearl/60">{common.locationShort}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-pearl/[0.07] pb-2.5">
                  <dt className="text-[10px] text-pearl/30">{footer.localTime}</dt>
                  <dd className="font-mono text-[10px] tabular-nums text-pearl/60">{localTime}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[10px] text-pearl/30">{footer.coordinates}</dt>
                  <dd className="font-mono text-[10px] text-pearl/60">{site.coordinates}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-pearl/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-pearl/20">
            {format(footer.copyright, { year: new Date().getFullYear() })}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline mono text-pearl/25 transition-colors hover:text-pearl/60"
            >
              GitHub
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline mono text-pearl/25 transition-colors hover:text-pearl/60"
            >
              Instagram
            </a>
            <a
              href={site.x}
              target="_blank"
              rel="noreferrer"
              className="link-underline mono text-pearl/25 transition-colors hover:text-pearl/60"
            >
              X
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mono text-pearl/25 transition-colors hover:text-pearl/60"
            >
              {footer.email}
            </a>
            <a
              href="#home"
              className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-pearl/35 transition-colors hover:text-pearl"
            >
              {footer.backToTop}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-1 text-[8px] leading-relaxed text-pearl/15 sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.tech}</span>
          <span>{footer.note}</span>
        </div>
      </div>
    </footer>
  )
}
