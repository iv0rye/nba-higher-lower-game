import { KeysContext } from '../context/keysContext'
import { useKeys } from '../hooks/useKeys'
import CourtScene from '../scene/CourtScene'
import { useGameStateStore } from '../stores/useGameStateStore'
import MenuView from './MenuView'
import UIOverlayView from './UIOverlayView'

export default function GameView() {
  const { keys } = useKeys()
  const gameState = useGameStateStore((state) => state.gameState)

  return (
    <KeysContext.Provider value={keys}>

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <CourtScene />

      {gameState === 'menu' && <MenuView />}
      {gameState === 'playing' && <UIOverlayView />}
    </div>

    </KeysContext.Provider>
  )
}
