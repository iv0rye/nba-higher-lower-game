import { useAnimations, useGLTF } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three'
import { useKeysContext } from "../context/keysContext"
import { usePlayerMovement } from "../hooks/usePlayerMovement"
import { usePlayerAnimation } from "../hooks/usePlayerAnimation"
import { useCameraMovement } from "../hooks/useCameraMovement"

const ANIMATIONS = [
  'CharacterArmature|Idle',
  'CharacterArmature|Run',
  'CharacterArmature|Victory',
  'CharacterArmature|Death',
  'CharacterArmature|Defeat',
] as const

type AnimationName = typeof ANIMATIONS[number]

interface PlayerProps {
  animation?: AnimationName
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function Player(
{ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.004
} : PlayerProps) {
  const playerRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/character.glb')
  const { actions } = useAnimations(animations, scene)

  const keysRef = useKeysContext()

  usePlayerMovement({playerRef, keysRef})
  // note: returns triggerAnimation and clearOverride which will be used for game logic
  usePlayerAnimation({ actions, playerRef })
  useCameraMovement({ playerRef })

  return (
    <primitive 
      ref={playerRef}
      object={scene} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}