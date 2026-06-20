import { type RefObject } from 'react'
import * as THREE from 'three'

interface Props {
    playerRef: RefObject<THREE.Group | null>
}

export function useCameraFollow({ playerRef }: Props) {
  
}