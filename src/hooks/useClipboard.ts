import { useCallback, useEffect, useRef, useState } from 'react'

async function writeText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function useClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<number | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await writeText(text)
        setCopied(true)
        if (timeout.current) window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => setCopied(false), resetAfter)
      } catch {
        setCopied(false)
      }
    },
    [resetAfter],
  )

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current)
    }
  }, [])

  return { copied, copy }
}
