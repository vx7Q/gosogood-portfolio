import { useEffect, useRef } from 'react'

export function GridBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const handlePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        element.style.setProperty('--pointer-x', `${event.clientX}px`)
        element.style.setProperty('--pointer-y', `${event.clientY}px`)
      })
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointer)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      style={{ ['--pointer-x' as string]: '50vw', ['--pointer-y' as string]: '20vh' }}
    >
      <div className="absolute inset-0 bg-grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_50%_10%,black_0%,transparent_78%)]" />
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(520px circle at var(--pointer-x) var(--pointer-y), rgba(110,139,255,0.09), transparent 65%)',
        }}
      />
      <div className="absolute -right-[20%] -top-[28%] h-[55rem] w-[55rem] rounded-full bg-electric/[0.08] blur-[140px]" />
      <div className="absolute -bottom-[35%] -left-[18%] h-[48rem] w-[48rem] rounded-full bg-electric/[0.05] blur-[150px]" />
      <div className="absolute left-1/2 top-[38%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-pearl/[0.02] blur-[120px]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
