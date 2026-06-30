import { useEffect, useState } from 'react'

const COUNT_DURATION_MS = 1000
const TICK_MS = 8
const ON_COMPLETE_DELAY_MS = 800

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// consideration: add amount of DP as param and return fixed to that
export function useIncreasingNumber(target: number | undefined, onComplete: () => void) {
  const [value, setValue] = useState(0)
	
  useEffect(() => {
    if (target === undefined) {
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
        setTimeout(onComplete, ON_COMPLETE_DELAY_MS)
      } else {
        setValue(target * eased)
      }
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [target])

  return value
}