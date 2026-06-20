import { useFrame, useThree } from '@react-three/fiber'
import { type RefObject } from 'react'
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(0, 12, 12) // camera offset is effectively distance from origin (player)
const LERP = 0.05
const CLAMP = { x: 8, z: 8 }

const CAMERA_ROTATION = new THREE.Euler(-0.9, 0, 0)
const CAMERA_INFLUENCE = 0.2

interface Props {
  playerRef: RefObject<THREE.Group | null>
}

export function useCameraMovement({ playerRef }: Props) {
  const { camera } = useThree()

  camera.rotation.copy(CAMERA_ROTATION)
	camera.position.y = OFFSET.y

  useFrame(() => {
    if (!playerRef.current) 
      return

    const pos = playerRef.current.position

		// define positions to lerp into
    const tx = THREE.MathUtils.clamp(pos.x * CAMERA_INFLUENCE, -CLAMP.x, CLAMP.x)
    const tz = THREE.MathUtils.clamp(pos.z * CAMERA_INFLUENCE, -CLAMP.z, CLAMP.z)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + OFFSET.x, LERP)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz + OFFSET.z, LERP)
  })
}