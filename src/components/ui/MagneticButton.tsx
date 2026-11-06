import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  icon?: ReactNode
  external?: boolean
  ariaLabel?: string
  disabled?: boolean
  download?: string
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  icon,
  external = false,
  ariaLabel,
  disabled = false,
  download,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.PointerEvent) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex h-12 select-none items-center justify-center gap-3 rounded-full text-[0.8125rem] font-medium tracking-[0.01em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-pearl pl-6 pr-1.5 text-ink hover:bg-white',
    secondary:
      'border border-white/[0.12] bg-white/[0.035] px-6 text-pearl backdrop-blur-md hover:border-white/[0.22] hover:bg-white/[0.07]',
    ghost: 'px-0 text-pearl/80 hover:text-pearl',
  }

  const arrow = icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' ? (
        <span className="relative z-10 ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-pearl transition-transform duration-500 ease-expo group-hover:rotate-45">
          {arrow}
        </span>
      ) : (
        <span className="relative z-10 flex h-7 w-7 items-center justify-center transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          {arrow}
        </span>
      )}
      {variant === 'ghost' && (
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-pearl/60 transition-transform duration-500 ease-expo group-hover:scale-x-100" />
      )}
    </>
  )

  return (
    <motion.div
      ref={ref}
      className="inline-flex"
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {href ? (
        <motion.a
          href={href}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault()
              onClick()
            }
          }}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={cn(base, variants[variant], className)}
          aria-label={ariaLabel}
          download={download}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          {content}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          className={cn(base, variants[variant], className)}
          aria-label={ariaLabel}
          disabled={disabled}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          {content}
        </motion.button>
      )}
    </motion.div>
  )
}
