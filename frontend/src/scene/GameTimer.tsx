import { useGameTimer } from '../hooks/useGameTimer'
import { useGameEngine } from '../hooks/useGameEngine'

export default function GameTimer() {
  const { handleGuess } = useGameEngine()

  // note: true is placeholder value. 
  useGameTimer(() => handleGuess(true))

  return null
}