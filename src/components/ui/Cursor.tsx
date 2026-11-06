import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const springRingX = useSpring(ringX, { stiffness: 400, damping: 34, mass: 0.45 })
  const springRingY = useSpring(ringY, { stiffness: 400, damping: 34, mass: 0.45 })
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const handleMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        dotX.set(event.clientX)
        dotY.set(event.clientY)
        ringX.set(event.clientX)
        ringY.set(event.clientY)
        setVisible(true)
      })
    }

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (!target?.closest) return
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      )
      setHovering(Boolean(interactive))
      const labelled = target.closest('[data-cursor-label]')
      setLabel(labelled?.getAttribute('data-cursor-label') ?? null)
    }

    const handleOut = () => {
      setHovering(false)
      setLabel(null)
    }

    const handleDown = () => setPressed(true)
    const handleUp = () => setPressed(false)
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerover', handleOver, { passive: true })
    window.addEventListener('pointerout', handleOut, { passive: true })
    window.addEventListener('pointerdown', handleDown, { passive: true })
    window.addEventListener('pointerup', handleUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.documentElement.addEventListener('mouseenter', handleEnter)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerover', handleOver)
      window.removeEventListener('pointerout', handleOut)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [dotX, dotY, ringX, ringY])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <div className="h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pearl mix-blend-difference" />
      </motion.div>

      <motion.div
        className="fixed left-0 top-0"
        style={{ x: springRingX, y: springRingY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center"
          animate={{
            width: label ? 78 : 34,
            height: label ? 78 : 34,
            scale: pressed ? 0.82 : hovering && !label ? 1.55 : 1,
            backgroundColor: label ? 'rgba(244, 246, 255, 0.97)' : 'rgba(244, 246, 255, 0)',
            borderColor: label ? 'rgba(244, 246, 255, 0)' : 'rgba(244, 246, 255, 0.42)',
          }}
          transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.5 }}
        >
          {label && (
            <span className="font-mono text-[8px] font-medium uppercase leading-tight tracking-[0.12em] text-ink">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
