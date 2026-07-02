import { useEffect, useState } from 'react'
import { useKeys } from './hooks/useKeys'
import { useGameStore } from './stores/useGameStore'
import GameView from './views/GameView'
import { KeysContext } from './context/keysContext'
import LoadingScreenView from './views/LoadingScreenView'
import UIOverlayView from './views/UIOverlayView'
import MenuView from './views/MenuView'
import { Route, Routes } from 'react-router-dom'
import EndGameView from './views/EndGameView'

export default function App() {
  const { keys } = useKeys()
  const gameState = useGameStore((state) => state.gameState)
  const [loaded, setLoaded] = useState(false)

  // disables mouse and context menu which playing
  useEffect(() => {
    const isPlaying = gameState === 'playing'
    
    document.body.classList.toggle('playing', isPlaying)

    const disableRightClick = (e: MouseEvent) => e.preventDefault()
    
    if (isPlaying) {
      document.addEventListener('contextmenu', disableRightClick)
    }

    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
    }
  }, [gameState])

  return (
    <KeysContext.Provider value={keys}>
      
      {!loaded && <LoadingScreenView onLoaded={() => setLoaded(true)}/>}

      <Routes>
        <Route path="/" element={
          <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            
            <GameView />

            {loaded && gameState === 'menu' && <MenuView />}

            {loaded && gameState === 'playing' && <UIOverlayView />}
            
            {loaded && gameState === 'gameover' && <EndGameView />}
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