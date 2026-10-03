import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A flag that turns itself off after `duration` ms.
 * Used for short feedback like "Додано в кошик".
 */
export function useTemporaryFlag(duration = 2000): [boolean, () => void] {
  const [active, setActive] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const trigger = useCallback(() => {
    window.clearTimeout(timer.current)
    setActive(true)
    timer.current = window.setTimeout(() => setActive(false), duration)
  }, [duration])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return [active, trigger]
}
