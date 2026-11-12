import { useEffect, useState } from 'react'
import { site } from '@/lib/data'

export function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: site.timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date())

    setTime(format())
    const interval = window.setInterval(() => setTime(format()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return time
}
