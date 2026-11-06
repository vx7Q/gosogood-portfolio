import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { LogoMark } from './Logo'

interface LoadingScreenProps {
  onDone: () => void
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const finished = useRef(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const duration = reducedMotion ? 350 : 1500
    const start = performance.now()
    let frame = 0
    let exitTimer: number | undefined

    const finish = () => {
      if (finished.current) return
      finished.current = true
      setProgress(100)
      exitTimer = window.setTimeout(onDone, reducedMotion ? 80 : 420)
    }

    const tick = (now: number) => {
      const elapsed = now - start
      const value = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(value)
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      if (exitTimer) window.clearTimeout(exitTimer)
    }
  }, [onDone, reducedMotion])

  const skip = () => {
    if (finished.current) return
    finished.current = true
    onDone()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col overflow-hidden bg-ink"
      exit={{ y: '-100%' }}
      transition={{ duration: reducedMotion ? 0.2 : 0.85, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading GOSOGOOD portfolio"
    >
      <div
        className="absolute inset-0 bg-grid-lines bg-[size:84px_84px] opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(70, 105, 255, 0.5), rgba(128, 80, 255, 0.22), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="bg-noise absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      <div className="relative flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3">
          <LogoMark size={26} />
          <span className="mono text-white/40">GOSOGOOD®</span>
        </div>
        <span className="mono hidden text-white/25 md:block">INITIALIZING EXPERIENCE</span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mono mb-5 text-white/35 md:mb-7"
        >
          PORTFOLIO — TWENTY TWENTY SIX
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="display text-center text-[clamp(3.6rem,13vw,10rem)] font-medium uppercase leading-[0.85] tracking-[-0.06em] text-gradient"
          >
            GOSOGOOD
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-7 flex items-center gap-4 md:mt-9"
        >
          <span className="h-px w-10 bg-white/15" />
          <span className="mono text-white/40">BUILDING DIGITAL EXPERIENCES</span>
          <span className="h-px w-10 bg-white/15" />
        </motion.div>
      </div>

      <div className="relative px-6 pb-8 md:px-12 md:pb-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <span className="mono text-white/30">LOADING EXPERIENCE</span>
          <div className="flex items-baseline gap-1.5 font-mono text-white/70">
            <span className="text-2xl font-medium tabular-nums tracking-tight md:text-3xl">
              {String(progress).padStart(3, '0')}
            </span>
            <span className="text-[10px] text-white/25">/ 100</span>
          </div>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-electric to-violet"
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="mono flex items-center gap-2 text-white/20">
            <ArrowDown className="h-3 w-3 animate-bounce" strokeWidth={1.5} />
            PLEASE WAIT
          </span>
          <button
            type="button"
            onClick={skip}
            className="mono group flex items-center gap-2 text-white/35 transition-colors hover:text-white"
          >
            SKIP INTRO
            <span className="h-px w-6 bg-white/30 transition-all duration-300 group-hover:w-9 group-hover:bg-white" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
