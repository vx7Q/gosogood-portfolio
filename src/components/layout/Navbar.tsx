import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react'
import { navItems, site } from '@/lib/data'
import { scrollToId } from '@/lib/utils'
import { useLocalTime } from '@/hooks/useLocalTime'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Logo } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const localTime = useLocalTime(site.timezone)
  useLockBodyScroll(menuOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track the section crossing the upper third of the viewport. A scroll-based
  // readout stays correct at the very bottom of the page, where a fixed-height
  // observer band can miss the final section entirely.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.scrollY + window.innerHeight * 0.35
      let current = sections[0]

      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = section
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = sections[sections.length - 1]

      setActive((previous) => (previous === current.id ? previous : current.id))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Keep the active pill aligned to the measured link, including after webfonts load.
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let cancelled = false
    const measure = () => {
      if (cancelled) return
      const link = nav.querySelector<HTMLElement>(`[data-nav="${active}"]`)
      if (!link) {
        setPill((previous) => ({ ...previous, visible: false }))
        return
      }
      setPill({ left: link.offsetLeft, width: link.offsetWidth, visible: true })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    document.fonts?.ready.then(measure).catch(() => undefined)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [active])

  const closeMenu = (restoreFocus = true) => {
    setMenuOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  useEffect(() => {
    if (!menuOpen) return

    const menu = menuRef.current
    const getFocusable = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null)

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement as HTMLElement | null

      if (!menu?.contains(activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }
      if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }

    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
    // closeMenu only uses stable setters and refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  const goTo = (href: string) => {
    scrollToId(href)
    setActive(href.replace('#', ''))
    setMenuOpen(false)
    if (window.location.hash !== href) {
      window.history.replaceState(null, '', href)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled
            ? 'border-b border-white/[0.06] bg-ink/70 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5',
        )}
      >
        <div className="container-page flex items-center justify-between gap-5">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              goTo('#home')
            }}
            className="group flex items-center"
            aria-label="GOSOGOOD — back to top"
          >
            <Logo
              markSize={scrolled ? 26 : 29}
              className="transition-all duration-500 group-hover:opacity-80"
            />
          </a>

          <nav
            ref={navRef}
            aria-label="Primary navigator"
            className="glass absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full p-1 lg:flex"
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 rounded-full border border-white/[0.09] bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
              animate={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.6 }}
            />
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-nav={item.href.slice(1)}
                  onClick={(event) => {
                    event.preventDefault()
                    goTo(item.href)
                  }}
                  className={cn(
                    'relative z-10 rounded-full px-3.5 py-2 text-[11.5px] font-medium tracking-[0.01em] transition-colors duration-300 xl:px-4',
                    isActive ? 'text-pearl' : 'text-white/45 hover:text-white/85',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo('#contact')}
              className="group hidden h-10 items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.035] pl-4 pr-2 text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur transition-colors duration-300 hover:border-white/25 hover:text-white md:flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              Let&apos;s Talk
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
              </span>
            </button>

            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-controls={menuOpen ? 'mobile-menu' : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.035] text-white/80 backdrop-blur transition-colors hover:bg-white/[0.07] hover:text-white lg:hidden"
            >
              <MenuIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="absolute inset-0 bg-grid-lines bg-[size:64px_64px] opacity-30"
              style={{
                maskImage: 'radial-gradient(ellipse at 50% 30%, black, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black, transparent 78%)',
              }}
              aria-hidden="true"
            />
            <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-electric/15 blur-[100px]" aria-hidden="true" />
            <div className="relative flex shrink-0 items-center justify-between px-5 py-5 sm:px-8">
              <Logo markSize={28} />
              <button
                type="button"
                onClick={() => closeMenu()}
                aria-label="Close menu"
                autoFocus
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/80"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav
              className="no-scrollbar relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 sm:px-10"
              aria-label="Mobile navigation"
            >
              <ul className="flex min-h-full flex-col justify-center space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16, transition: { duration: 0.2, delay: 0 } }}
                    transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.href)
                      }}
                      className="group flex items-center justify-between border-b border-white/[0.07] py-2.5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[9px] text-white/25">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="display text-[clamp(2rem,9.5vw,3.6rem)] uppercase tracking-[-0.03em] text-white/70 transition-colors group-hover:text-white">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric" strokeWidth={1.25} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="relative flex shrink-0 flex-col gap-5 px-6 pb-8 sm:px-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mono mb-1.5 text-white/25">GET IN TOUCH</p>
                  <a href={`mailto:${site.email}`} className="text-sm text-white/70 underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </div>
                <span className="mono text-right text-white/30">
                  BKK {localTime}
                </span>
              </div>
              <div className="h-px w-full bg-white/[0.07]" />
              <div className="flex items-center justify-between">
                <SocialLinks />
                <span className="mono flex items-center gap-2 text-white/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  OPEN TO WORK
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
