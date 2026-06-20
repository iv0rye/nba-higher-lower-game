import { useEffect, useRef, type RefObject } from "react";
import * as THREE from 'three'
import type { KeysRef } from "../types/game";

export function usePlayerMovement(
  playerRef: RefObject<THREE.Group>,
  keysRef: KeysRef
) {
}