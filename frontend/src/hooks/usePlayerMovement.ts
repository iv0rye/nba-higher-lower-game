import { useRef, type RefObject } from "react";
import * as THREE from 'three'
import type { KeysRef } from "../types/game";
import { useFrame } from "@react-three/fiber";
import { DEFAULT_BINDINGS, isActionActive } from "../config/keyBinds";

const SPEED = 4
const ACCELERATION = 20
const FRICTION = 15

const LEVEL_BOUNDS = new THREE.Box2( 
  new THREE.Vector2(-7, -4),  // min x, z
  new THREE.Vector2(7, 4)     // max x, z
)

// TODOs: make rotation less static (lerp?), add acceleration + velocity
export function usePlayerMovement(
  playerRef: RefObject<THREE.Group | null>,
  keysRef: KeysRef
) {
  const velocity = useRef(new THREE.Vector2(0, 0))
  const direction = useRef(new THREE.Vector2(0, 0))

  useFrame((_, delta) => {
    if (!playerRef.current || !keysRef.current) return

    direction.current.set(0, 0)

    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.forward))  
      direction.current.y -= 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.backward)) 
      direction.current.y += 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.left))     
      direction.current.x -= 1
    if (isActionActive(keysRef.current, DEFAULT_BINDINGS.right))    
      direction.current.x += 1

    // normalising diagonals to get true direction vector
    if (direction.current.lengthSq() > 1) 
      direction.current.normalize()
    

    // if there was input
    if (direction.current.lengthSq() > 0) {
      // accelerate in direction
      velocity.current.x += direction.current.x * ACCELERATION * delta
      velocity.current.y += direction.current.y * ACCELERATION * delta

      // clamp to max speed
      velocity.current.clampLength(0, SPEED)
    } else {
      // apply friction/decceleration
      velocity.current.x -= velocity.current.x * FRICTION * delta
      velocity.current.y -= velocity.current.y * FRICTION * delta
    }
    // apply velocity
    playerRef.current.position.x += velocity.current.x * delta
    playerRef.current.position.z += velocity.current.y * delta

    // clamp to bounds
    playerRef.current.position.x = THREE.MathUtils.clamp(
      playerRef.current.position.x, LEVEL_BOUNDS.min.x, LEVEL_BOUNDS.max.x
    )
    playerRef.current.position.z = THREE.MathUtils.clamp(
      playerRef.current.position.z, LEVEL_BOUNDS.min.y, LEVEL_BOUNDS.max.y
    )

    if (direction.current.x !== 0 || direction.current.y !== 0) {
      playerRef.current.rotation.y = Math.atan2(direction.current.x, direction.current.y)
    }
  })
}