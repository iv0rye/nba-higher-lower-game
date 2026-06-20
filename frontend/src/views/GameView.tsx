import { KeysContext } from '../context/keysContext'
import { useKeys } from '../hooks/useKeys'
import CourtScene from '../scene/CourtScene'

export default function GameView() {
  const { keys } = useKeys()

  return (
    <KeysContext.Provider value={keys}>

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <CourtScene />
    </div>

    </KeysContext.Provider>
  )
}