import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, sectionIds, site } from '@/lib/data'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBody } from '@/hooks/useLockBody'
import { useLocalTime } from '@/hooks/useLocalTime'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const localTime = useLocalTime()

  useLockBody(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
          scrolled ? 'border-b border-pearl/[0.07] bg-ink/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav
            className="hidden items-center gap-0.5 rounded-full border border-pearl/[0.09] bg-pearl/[0.02] p-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-colors duration-300',
                    isActive ? 'bg-pearl/[0.08] text-pearl' : 'text-pearl/40 hover:text-pearl',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden h-10 items-center gap-2.5 rounded-full border border-pearl/[0.14] bg-pearl/[0.03] pl-4 pr-1.5 text-[9px] uppercase tracking-[0.14em] text-pearl/65 transition-colors duration-300 hover:border-pearl/30 hover:text-pearl sm:inline-flex"
            >
              Say hello
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pearl text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/[0.12] bg-pearl/[0.03] text-pearl transition-colors hover:bg-pearl/[0.08] lg:hidden"
              aria-label="Open menu"
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
            className="fixed inset-0 z-[90] flex h-[100dvh] flex-col bg-ink/[0.97] backdrop-blur-2xl lg:hidden"
          >
            <div className="container-page flex h-[72px] shrink-0 items-center justify-between">
              <div onClick={() => setOpen(false)}>
                <Logo />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/10 bg-pearl/[0.03] text-pearl"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            <div className="container-page flex flex-1 flex-col overflow-y-auto pt-6">
              <p className="mono mb-5 text-pearl/25">Navigation</p>
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.4 }}
                    className="group flex items-center justify-between border-b border-pearl/[0.08] py-4"
                  >
                    <span className="display text-[clamp(1.8rem,8vw,2.6rem)] leading-none tracking-[-0.04em] text-pearl">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="mono text-pearl/15">0{index + 1}</span>
                      <ArrowUpRight className="h-4 w-4 text-pearl/30 transition-transform duration-300 group-hover:rotate-45 group-hover:text-pearl" />
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-5 pb-8 pt-10">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
                  </span>
                  <span className="text-[11px] text-pearl/65">{site.availability}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-pearl/[0.08] pt-5">
                  <div>
                    <p className="mono text-pearl/25">{site.locationShort}</p>
                    <p className="mt-1.5 font-mono text-[12px] tabular-nums text-pearl/55">{localTime} ICT</p>
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
