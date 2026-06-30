import { useRef } from 'react'
import CourtScene from '../scene/CourtScene'
import * as THREE from 'three'
import { PlayerRefContext } from '../context/playerRefContext'

export default function GameView() {
  const playerRef = useRef<THREE.Group>(null)
  
  return (
    <PlayerRefContext.Provider value={playerRef}>

    <CourtScene />
    
    </PlayerRefContext.Provider>
  )
}
