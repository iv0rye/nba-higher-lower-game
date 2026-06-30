import { useGameTimer } from '../hooks/useGameTimer'
import { useGameEngine } from '../hooks/useGameEngine'

export default function GameTimer() {
  const { handleGuess } = useGameEngine()

  // when timer ends, guess based on player zone
  // for now passes true as placeholder — wire up zone detection later
  useGameTimer(() => handleGuess(true))

  return null
}