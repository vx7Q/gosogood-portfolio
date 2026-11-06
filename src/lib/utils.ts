import { getSmoothScroll } from './smoothScroll'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Resolve a file in `public/` against Vite's configured base path. */
export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function scrollToId(id: string) {
  const element = document.getElementById(id.replace('#', ''))
  if (!element) return

  const lenis = getSmoothScroll()
  if (lenis) {
    // Lenis honours the element's `scroll-margin-top`, so sections still clear
    // the fixed navbar without hard-coding an offset here.
    lenis.scrollTo(element)
    return
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / insecure contexts
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}
