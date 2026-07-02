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
import PageNotFoundView from './views/PageNotFoundView'
import ShareGameView from './views/ShareGameView'

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
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        {!loaded && <LoadingScreenView onLoaded={() => setLoaded(true)}/>}

        <GameView />

        <Routes>

          <Route path="/" element={
            <>
              {loaded && gameState === 'menu' && <MenuView />}

              {loaded && gameState === 'playing' && <UIOverlayView />}
              
              {loaded && gameState === 'gameover' && <EndGameView />}
            </>
          } />

          <Route path="/share/:sessionToken" element={
            <ShareGameView />
          } />

          <Route path="*" element={
            <PageNotFoundView />
          } />

        </Routes>
      </div>
    </KeysContext.Provider>
  )
}