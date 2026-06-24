import { useState } from 'react'
import { useKeys } from './hooks/useKeys'
import { useGameStore } from './stores/useGameStore'
import GameView from './views/GameView'
import { KeysContext } from './context/keysContext'
import LoadingScreenView from './views/LoadingScreenView'
import UIOverlayView from './views/UIOverlayView'
import MenuView from './views/MenuView'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  const { keys } = useKeys()
  const gameState = useGameStore((state) => state.gameState)
  const [loaded, setLoaded] = useState(false)

  return (
    <KeysContext.Provider value={keys}>
      
      {!loaded && <LoadingScreenView onLoaded={() => setLoaded(true)}/>}

      <Routes>
        <Route path="/" element={
          <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <GameView />
            {loaded && gameState === 'menu' && <MenuView />}
            {loaded && gameState === 'playing' && <UIOverlayView />}
          </div>
        } />

        <Route path="/tutorial" element={
          <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            temporary
          </div>
        } />
      </Routes>

    </KeysContext.Provider>
  )
}