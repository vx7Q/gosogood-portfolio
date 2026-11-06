import { useEffect } from 'react'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.classList.add('is-locked')
    stopSmoothScroll()
    return () => {
      document.body.classList.remove('is-locked')
      document.body.style.overflow = previous
      startSmoothScroll()
    }
  }, [locked])
}
