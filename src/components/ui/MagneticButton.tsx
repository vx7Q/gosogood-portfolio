import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  variant?: Variant
  className?: string
  arrow?: boolean
  ariaLabel?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-pearl text-ink hover:bg-pearl/90',
  secondary: 'border border-pearl/15 bg-pearl/[0.03] text-pearl hover:border-pearl/30 hover:bg-pearl/[0.06]',
}

export function MagneticButton({
  children,
  onClick,
  href,
  external = true,
  variant = 'primary',
  className,
  arrow = true,
  ariaLabel,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.14)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group inline-flex h-12 items-center justify-center gap-4 rounded-full pl-5 pr-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:cursor-wait disabled:opacity-70',
    variantStyles[variant],
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45',
            variant === 'primary' ? 'bg-ink text-pearl' : 'border border-pearl/10 bg-pearl/[0.04] text-pearl',
          )}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </span>
      )}
    </>
  )

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.98 },
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {inner}
    </motion.button>
  )
}
