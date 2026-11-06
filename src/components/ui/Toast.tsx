import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ToastProps {
  show: boolean
  message: string
}

export function Toast({ show, message }: ToastProps) {
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong fixed bottom-6 left-1/2 z-[190] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2.5 text-xs text-pearl shadow-soft"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-electric/15 text-electric">
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
