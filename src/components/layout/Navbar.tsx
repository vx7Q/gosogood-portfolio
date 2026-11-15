import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { sectionIds } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBody } from '@/hooks/useLockBody'
import { useLocalTime } from '@/hooks/useLocalTime'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { LanguagePicker, LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const localTime = useLocalTime()
  const { copy } = useI18n()
  const { nav, common } = copy

  useLockBody(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[70] border-b border-pearl/[0.12] bg-ink transition-all duration-500',
          scrolled && 'shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]',
        )}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-6 lg:flex" aria-label={nav.mainNav}>
            {nav.links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'nav-label relative py-2 text-[13px] tracking-[0.01em] transition-colors duration-300',
                    isActive ? 'text-electric' : 'text-pearl/60 hover:text-pearl',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-electric" aria-hidden="true" />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden lg:flex" />

            <a
              href="#contact"
              className="group hidden h-10 items-center gap-2.5 rounded-full bg-pearl pl-4 pr-1.5 text-[12px] font-medium text-ink transition-colors duration-300 hover:bg-electric hover:text-white sm:inline-flex"
            >
              {nav.sayHello}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-500 group-hover:rotate-45 group-hover:bg-ink">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </a>

            <LanguageSwitcher size="sm" className="lg:hidden" />

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/[0.16] bg-panel text-pearl transition-colors hover:border-pearl/35 lg:hidden"
              aria-label={nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex h-[100dvh] flex-col bg-ink lg:hidden"
          >
            <div className="container-page flex h-[76px] shrink-0 items-center justify-between border-b border-pearl/[0.1]">
              <div onClick={() => setOpen(false)}>
                <Logo />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/[0.16] bg-panel text-pearl"
                aria-label={nav.closeMenu}
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            <div className="container-page flex flex-1 flex-col overflow-y-auto pt-7">
              <p className="mono mb-5">{nav.navigation}</p>
              <nav className="flex flex-col" aria-label={nav.mobileNav}>
                {nav.links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.4 }}
                    className="group flex items-center justify-between border-b border-pearl/[0.12] py-4"
                  >
                    <span className="display text-[clamp(1.9rem,8vw,2.8rem)] leading-none tracking-[-0.04em] text-pearl">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="mono text-pearl/45">0{index + 1}</span>
                      <ArrowUpRight className="h-4 w-4 text-pearl/45 transition-transform duration-300 group-hover:rotate-45 group-hover:text-electric" />
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-5 pb-7 pt-8">
                <LanguagePicker />

                <div className="flex items-center gap-2.5 border-t border-pearl/[0.12] pt-5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
                  </span>
                  <span className="text-[13px] text-pearl/75">{common.availability}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="mono">{common.locationShort}</p>
                    <p className="mt-1.5 font-mono text-[13px] tabular-nums text-pearl/65">{localTime} ICT</p>
                  </div>
                  <SocialLinks className="gap-2" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
