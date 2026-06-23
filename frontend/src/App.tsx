import { useState } from 'react'
import { useKeys } from './hooks/useKeys'
import { useGameStateStore } from './stores/useGameStateStore'
import GameView from './views/GameView'
import { KeysContext } from './context/keysContext'
import LoadingScreenView from './views/LoadingScreenView'
import UIOverlayView from './views/UIOverlayView'
import MenuView from './views/MenuView'

export default function App() {
  const { keys } = useKeys()
  const gameState = useGameStateStore((state) => state.gameState)
  const [loaded, setLoaded] = useState(false)

  return (
    <KeysContext.Provider value={keys}>

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <GameView />
      {!loaded && <LoadingScreenView onLoaded={() => setLoaded(true)}/>}
      {loaded && gameState === 'menu' && <MenuView />}
      {loaded && gameState === 'playing' && <UIOverlayView />}
    </div>

    </KeysContext.Provider>
  )
}