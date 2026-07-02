import { useRef } from "react";
import * as THREE from 'three'
import type { KeysRef } from "../types/game";
import { useFrame } from "@react-three/fiber";
import { DEFAULT_BINDINGS, isActionActive } from "../config/keyBinds";
import sounds from "../audio/sounds";

const SPEED = 4
const ROTATION_SPEED = 10
const FOOTSTEP_GAP = 400

const LEVEL_BOUNDS = new THREE.Box2( 
  new THREE.Vector2(-7, -4),  // min x, z
  new THREE.Vector2(7, 4)     // max x, z
)

interface Props {
  playerRef: React.RefObject<THREE.Group | null>
  keysRef: KeysRef
  enabled?: boolean
}

export function usePlayerMovement({ playerRef, keysRef, enabled=true }: Props) {
  const direction = new THREE.Vector2(0, 0)
  const lastFootstep = useRef(0)

  const targetQuaternion = useRef(new THREE.Quaternion())

  useFrame((_, delta) => {
    if (!playerRef.current || !keysRef.current || !enabled) return

    direction.set(0, 0)

    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.forward))  
      direction.y -= 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.backward)) 
      direction.y += 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.left))     
      direction.x -= 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.right))    
      direction.x += 1

    // normalising diagonals to get true direction vector
    if (direction.lengthSq() > 1) 
      direction.normalize()
    

    // if there was input
    if (direction.lengthSq() > 0) {
      // audio processing
      const now = performance.now()

      if (now - lastFootstep.current > FOOTSTEP_GAP) {
        sounds.footstep.play()
        lastFootstep.current = now
      }

      playerRef.current.position.x += direction.x * SPEED * delta
      playerRef.current.position.z += direction.y * SPEED * delta

      // compute target quaternion from direction
      const angle = Math.atan2(direction.x, direction.y)

      targetQuaternion.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)
    } 
    // clamp to bounds
    playerRef.current.position.x = THREE.MathUtils.clamp(
      playerRef.current.position.x, LEVEL_BOUNDS.min.x, LEVEL_BOUNDS.max.x
    )
    playerRef.current.position.z = THREE.MathUtils.clamp(
      playerRef.current.position.z, LEVEL_BOUNDS.min.y, LEVEL_BOUNDS.max.y
    )

    playerRef.current.quaternion.slerp(targetQuaternion.current, ROTATION_SPEED * delta)
  })
}