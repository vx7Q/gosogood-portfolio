import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  maxTilt?: number
  disabled?: boolean
}

export function TiltCard({
  children,
  className,
  innerClassName,
  maxTilt = 5,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springX = useSpring(px, { stiffness: 160, damping: 22, mass: 0.5 })
  const springY = useSpring(py, { stiffness: 160, damping: 22, mass: 0.5 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt])

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || disabled || event.pointerType !== 'mouse') return
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    px.set(x - 0.5)
    py.set(y - 0.5)
    ref.current?.style.setProperty('--mouse-x', `${x * 100}%`)
    ref.current?.style.setProperty('--mouse-y', `${y * 100}%`)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}
      className={cn(disabled && 'transform-none', className)}
    >
      <div className={cn('h-full w-full', innerClassName)}>{children}</div>
    </motion.div>
  )
}
