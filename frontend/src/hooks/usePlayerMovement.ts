import { type RefObject } from "react";
import * as THREE from 'three'
import type { KeysRef } from "../types/game";
import { useFrame } from "@react-three/fiber";
import { DEFAULT_BINDINGS, isActionActive } from "../config/keyBinds";
import { FRAME_PRIORITIES } from "../config/framePriorities";

const SPEED = 5
const LEVEL_BOUNDS = new THREE.Box2( 
  new THREE.Vector2(-8, -6),  // min x, z
  new THREE.Vector2(8, 6)     // max x, z
)


export function usePlayerMovement(
  playerRef: RefObject<THREE.Group | null>,
  keysRef: KeysRef
) {
  useFrame((_, delta) => {
    if (!playerRef.current || !keysRef.current) return

    let moveX = 0
    let moveZ = 0

    if (isActionActive(keysRef.current ?? {}, DEFAULT_BINDINGS.forward))  moveZ -= 1
    if (isActionActive(keysRef.current ?? {}, DEFAULT_BINDINGS.backward)) moveZ += 1
    if (isActionActive(keysRef.current ?? {}, DEFAULT_BINDINGS.left))     moveX -= 1
    if (isActionActive(keysRef.current ?? {}, DEFAULT_BINDINGS.right))    moveX += 1

    if (moveX !== 0 && moveZ !== 0) {
      moveX *= 0.707
      moveZ *= 0.707
    }

    console.log(moveX, moveZ)
    playerRef.current.position.x += moveX * SPEED * delta
    playerRef.current.position.z += moveZ * SPEED * delta

    playerRef.current.position.x = THREE.MathUtils.clamp(
      playerRef.current.position.x, LEVEL_BOUNDS.min.x, LEVEL_BOUNDS.max.x
    )
    playerRef.current.position.z = THREE.MathUtils.clamp(
      playerRef.current.position.z, LEVEL_BOUNDS.min.y, LEVEL_BOUNDS.min.y // y vector in bound box is z vector in world axis
    )

    if (moveX !== 0 || moveZ !== 0) {
      playerRef.current.rotation.y = Math.atan2(moveX, moveZ)
    }
  })
}