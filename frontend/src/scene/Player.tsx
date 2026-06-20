import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { useKeysContext } from "../context/keysContext"
import { usePlayerMovement } from "../hooks/usePlayerMovement"

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
  animation = 'CharacterArmature|Idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.004
} : PlayerProps) {
  const playerRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/character.glb')
  const { actions } = useAnimations(animations, scene)

  const keysRef = useKeysContext()

  usePlayerMovement({playerRef, keysRef})

  useEffect(() => {
    // stop all animations
    Object.values(actions).forEach(action => action?.stop())
    // play passed in animation
    actions[animation]?.reset().fadeIn(0.3).play()

    return () => {
      actions[animation]?.fadeOut(0.3)
    }
  }, [animation, actions])

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