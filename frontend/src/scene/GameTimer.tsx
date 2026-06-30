import { useGameTimer } from '../hooks/useGameTimer'
import { useGameEngine } from '../hooks/useGameEngine'
import { usePlayerRefContext } from '../context/playerRefContext'
import { getPlayerZone } from '../utils/playerZone'

export default function GameTimer() {
  const { handleGuess } = useGameEngine()
  const playerRef = usePlayerRefContext()

  useGameTimer(() => {
    const playerZone = getPlayerZone(playerRef)
    handleGuess(playerZone === 'higher')
  })

  return null
}