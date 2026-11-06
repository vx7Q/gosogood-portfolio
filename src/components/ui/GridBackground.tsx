import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function GridBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame: number | null = null
    const handleMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        spotlightRef.current?.style.setProperty('--spot-x', `${event.clientX}px`)
        spotlightRef.current?.style.setProperty('--spot-y', `${event.clientY}px`)
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base grid */}
      <div
        className="absolute inset-0 bg-grid-lines bg-[size:84px_84px] opacity-60"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 75% at 50% 30%, black 10%, rgba(0,0,0,0.55) 45%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 75% at 50% 30%, black 10%, rgba(0,0,0,0.55) 45%, transparent 85%)',
        }}
      />

      {/* Interactive grid spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(132, 160, 255, 0.19) 1px, transparent 1px), linear-gradient(to bottom, rgba(132, 160, 255, 0.19) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
          maskImage:
            'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(0,0,0,0.9), transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(0,0,0,0.9), transparent 70%)',
        }}
      />

      {/* Ambient light fields */}
      <div
        className="ambient-orb absolute -right-[12%] -top-[16%] h-[62vw] w-[62vw] rounded-full opacity-[0.24] animate-aurora"
        style={{
          background:
            'radial-gradient(circle, rgba(49, 90, 255, 0.9) 0%, rgba(64, 57, 163, 0.4) 42%, transparent 70%)',
        }}
      />
      <div
        className="ambient-orb absolute -left-[18%] top-[32%] h-[52vw] w-[52vw] rounded-full opacity-[0.16] animate-aurora"
        style={{
          background:
            'radial-gradient(circle, rgba(126, 77, 255, 0.85) 0%, rgba(70, 35, 140, 0.35) 45%, transparent 70%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="ambient-orb absolute -bottom-[20%] left-[35%] h-[45vw] w-[45vw] rounded-full opacity-[0.12] animate-aurora"
        style={{
          background:
            'radial-gradient(circle, rgba(60, 120, 255, 0.8) 0%, rgba(18, 30, 90, 0.25) 50%, transparent 72%)',
          animationDelay: '-12s',
        }}
      />

      {/* Top edge light */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Film grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.032] mix-blend-soft-light" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 0%, transparent 55%, rgba(5,6,9,0.55) 100%)',
        }}
      />
    </div>
  )
}

export function AmbientDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none relative h-px w-full overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-24 w-[40%] -translate-x-1/2 -translate-y-1/2 bg-electric/10 blur-2xl" />
    </motion.div>
  )
}
