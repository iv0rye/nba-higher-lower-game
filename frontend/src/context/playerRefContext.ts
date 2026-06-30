import { createContext, useContext } from 'react'
import { type RefObject } from 'react'
import * as THREE from 'three'

export const PlayerRefContext = createContext<RefObject<THREE.Group | null>>({ current: null })

export function usePlayerRefContext() {
  return useContext(PlayerRefContext)
}