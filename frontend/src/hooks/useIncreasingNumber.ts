import { useEffect, useState } from 'react'

const COUNT_DURATION_MS = 1200
const TICK_MS = 8

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function useIncreasingNumber(target: number | undefined, active: boolean, onComplete: () => void) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || target === undefined) {
      setValue(0)
      return
    }

    const startTime = performance.now()

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / COUNT_DURATION_MS, 1)
      const eased = easeOut(progress)

      if (progress >= 1) {
        setValue(target)
        clearInterval(interval)
        onComplete()
      } else {
        setValue(target * eased)
      }
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [active, target])

  return value
}