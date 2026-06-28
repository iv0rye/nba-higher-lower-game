import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../stores/useGameStore'

export function useGameTimer(onTimerEnd: () => void) {
  const accumulated = useRef(0)
  const onTimerEndRef = useRef(onTimerEnd)
  onTimerEndRef.current = onTimerEnd

  useFrame((_, delta) => {
    const { phase, timeLeft, setTimeLeft } = useGameStore.getState()

    if (phase !== 'playing') {
      accumulated.current = 0
      return
    }

    accumulated.current += delta

    if (accumulated.current >= 1) {
      accumulated.current = 0
      const newTime = timeLeft - 1

      if (newTime <= 0) {
        setTimeLeft(0)
        onTimerEndRef.current()
      } else {
        setTimeLeft(newTime)
      }
    }
  })
}