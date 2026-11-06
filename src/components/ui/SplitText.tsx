import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  once?: boolean
}

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={cn('inline', className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="relative inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial={reducedMotion ? { y: 0 } : { y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: '-8% 0px' }}
            transition={{
              duration: 0.9,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
