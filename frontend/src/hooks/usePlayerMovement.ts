import { useEffect, useRef, type RefObject } from "react";
import * as THREE from 'three'

export function usePlayerMovement(playerRef: RefObject<THREE.Group>) {
  const keys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true }
    const onKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])
}