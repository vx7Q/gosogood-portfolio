import Lenis from 'lenis'

let instance: Lenis | null = null

const easeOutExpo = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t))

/**
 * Start the global smooth-scroll instance. Lenis only needs to exist on the
 * client, and it is intentionally a singleton so imperative scrolls from any
 * section can reuse the same animation loop.
 */
export function initSmoothScroll() {
  if (instance || typeof window === 'undefined') return instance

  instance = new Lenis({
    duration: 1.1,
    easing: easeOutExpo,
    smoothWheel: true,
    // Native touch scrolling is already fluid and less expensive on mobile.
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    autoRaf: true,
    anchors: true,
    respectReducedMotion: true,
  })

  return instance
}

export function getSmoothScroll() {
  return instance
}

export function stopSmoothScroll() {
  instance?.stop()
}

export function startSmoothScroll() {
  instance?.start()
}

export function destroySmoothScroll() {
  instance?.destroy()
  instance = null
}
