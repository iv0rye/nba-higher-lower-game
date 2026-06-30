import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useGameStore } from '../stores/useGameStore'

// note: camera offset is effectively distance from origin (player)
const OFFSET = new THREE.Vector3(0, 12, 12)
const INTRO_TARGET = new THREE.Vector3(0, 200, 0)
const PLAY_TARGET = new THREE.Vector3(0, 0, 0)

const ANIMATION_LERP = 0.02
const LERP = 0.05
const CLAMP = { x: 8, z: 8 }

const CAMERA_INFLUENCE = 0.2

interface Props {
  playerRef: RefObject<THREE.Group | null>
  isPlaying?: boolean
}

export function useCameraMovement({ playerRef, isPlaying=true }: Props) {
  const { camera } = useThree()
  const atPlayPosition = useRef(false)
  const lookAtTarget = useRef(INTRO_TARGET.clone())
  const mouseOffset = useRef(new THREE.Vector2(0, 0))
  const setPhase = useGameStore((state) => state.setPhase)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // normalize -> -1 to 1
      mouseOffset.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseOffset.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useFrame(() => {
    if (!isPlaying) {
      atPlayPosition.current = false
      lookAtTarget.current.copy(INTRO_TARGET)

      const mx = mouseOffset.current.x   
      const mz = mouseOffset.current.y  

      camera.lookAt(
        lookAtTarget.current.x + mx * (1/2), // multiplied by strength of lookat
        lookAtTarget.current.y,
        lookAtTarget.current.z - mz * 2
      )
      return
    }

    if (!atPlayPosition.current) {
      panCamera(camera, atPlayPosition, lookAtTarget, () => setPhase('playing'))
      return
    }

    followPlayer(camera, playerRef)
  })
}

function followPlayer(camera: THREE.Camera, playerRef: RefObject<THREE.Group | null>) {
  if (!playerRef.current) 
      return

  const pos = playerRef.current.position

  // define positions to lerp into
  const tx = THREE.MathUtils.clamp(pos.x * CAMERA_INFLUENCE, -CLAMP.x, CLAMP.x)
  const tz = THREE.MathUtils.clamp(pos.z * CAMERA_INFLUENCE, -CLAMP.z, CLAMP.z)

  camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + OFFSET.x, LERP)
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz + OFFSET.z, LERP)
}

function panCamera(camera: THREE.Camera, atPlayPosition: RefObject<boolean>, lookAtTarget: RefObject<THREE.Vector3>, onComplete: () => void) {
  /**
   * Pans camera from sky to play area 
   */
  lookAtTarget.current.lerp(PLAY_TARGET, ANIMATION_LERP)
  camera.lookAt(lookAtTarget.current)

  if (lookAtTarget.current.distanceTo(PLAY_TARGET) < 0.1) {
    atPlayPosition.current = true
    onComplete()
  }
}