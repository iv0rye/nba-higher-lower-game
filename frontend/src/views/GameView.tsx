import { useState } from 'react'
import { KeysContext } from '../context/keysContext'
import { useKeys } from '../hooks/useKeys'
import CourtScene from '../scene/CourtScene'
import { useGameStateStore } from '../stores/useGameStateStore'
import LoadingScreenView from './LoadingScreenView'
import MenuView from './MenuView'
import UIOverlayView from './UIOverlayView'

export default function GameView() {
  const { keys } = useKeys()
  const gameState = useGameStateStore((state) => state.gameState)
  const [loaded, setLoaded] = useState(false)

  return (
    <KeysContext.Provider value={keys}>

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <CourtScene />
      {!loaded && <LoadingScreenView onLoaded={() => setLoaded(true)}/>}
      {gameState === 'menu' && <MenuView />}
      {gameState === 'playing' && <UIOverlayView />}
    </div>

    </KeysContext.Provider>
  )
}
