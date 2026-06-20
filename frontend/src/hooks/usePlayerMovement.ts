import { type RefObject } from "react";
import * as THREE from 'three'
import type { KeysRef } from "../types/game";
import { useFrame } from "@react-three/fiber";
import { DEFAULT_BINDINGS } from "../config/keyBinds";
import { vec2 } from "three/tsl";

const SPEED = 5
const LEVEL_AREA = [
  [-8, 8], 
  [-6, 6]
]

export function usePlayerMovement(
  playerRef: RefObject<THREE.Group>,
  keysRef: KeysRef
) {
  useFrame((_, delta) => {
    if (!playerRef.current || !keysRef.current) return

    let moveX = 0
    let moveZ = 0
  })
}