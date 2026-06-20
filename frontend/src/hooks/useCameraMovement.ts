import { useFrame, useThree } from '@react-three/fiber'
import { type RefObject } from 'react'
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(0, 8, 14)
const LERP = 0.05
const CLAMP = { x: 8, z: 8 }

interface Props {
    playerRef: RefObject<THREE.Group | null>
}

export function useCameraMovement({ playerRef }: Props) {
  const { camera } = useThree()

  useFrame(() => {
    if (!playerRef.current) return

    const pos = playerRef.current.position

    const tx = THREE.MathUtils.clamp(pos.x, -CLAMP.x, CLAMP.x)
    const tz = THREE.MathUtils.clamp(pos.z, -CLAMP.z, CLAMP.z)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + OFFSET.x, LERP)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, OFFSET.y, LERP)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz + OFFSET.z, LERP)

    camera.lookAt(pos.x, 0, pos.z)
  })
}