import { useEffect, useMemo, useState } from 'react'

export function useLocalTime(timeZone: string, withSeconds = true) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        ...(withSeconds ? { second: '2-digit' } : {}),
        hour12: false,
        timeZone,
      }),
    [timeZone, withSeconds],
  )
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatter.format(new Date()))
    }, withSeconds ? 1000 : 30000)
    return () => window.clearInterval(timer)
  }, [formatter, withSeconds])

  return time
}
