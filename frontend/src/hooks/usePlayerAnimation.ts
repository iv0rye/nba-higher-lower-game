import * as THREE from "three"
import type { AnimationName } from "../types/game"
import { useCallback, useRef } from "react"
import { useFrame } from "@react-three/fiber"

type AnimationConditions = {
  override: AnimationName | null
  moving: boolean
}

const FADE_DURATION = 0.2
const MOVE_THRESHOLD = 0.001

function playAnimation(
  nextAnimationName: AnimationName,
	currentAnimationName: AnimationName,
  actions: Partial<Record<string, THREE.AnimationAction | null>>,
): AnimationName {
	// if animation is already playing, return
  if (currentAnimationName === nextAnimationName) 
		return currentAnimationName

  actions[currentAnimationName]?.fadeOut(FADE_DURATION)
  actions[nextAnimationName]?.reset().fadeIn(FADE_DURATION).play()

  return nextAnimationName
}

function selectAnimation(conditions: AnimationConditions): AnimationName {
	const { override, moving } = conditions

	// note: for any new situations requring an animation, add to conditions first then insert
	// return based on priority
  if (override)  
		return override                     
  if (moving)    
		return 'CharacterArmature|Run'

  return 'CharacterArmature|Idle'                   
}

interface Props {
  playerRef: React.RefObject<THREE.Group | null>
	actions: Partial<Record<string, THREE.AnimationAction | null>>
}

export function usePlayerAnimation({ actions, playerRef }: Props) {
	const currentAnimation = useRef<AnimationName>('CharacterArmature|Idle')
  const animationOverride = useRef<AnimationName | null>(null)
	const initialized = useRef(false)

	// for movement check
  const prevPosition = useRef(new THREE.Vector3())

	// inline function to trigger new animation
  const triggerAnimation = useCallback((name: AnimationName) => {
    animationOverride.current = name
  }, [])

	// inline function to clear animation trigger
  const clearOverride = useCallback(() => {
    animationOverride.current = null
  }, [])

  useFrame(() => {
    if (!playerRef.current) return

    // initialize idle anim on first frame
    if (!initialized.current && actions['CharacterArmature|Idle']) {
      actions['CharacterArmature|Idle'].play()
      initialized.current = true
    }

		// finding isMoving bool
    const position = playerRef.current.position
    const moving = (position.distanceTo(prevPosition.current) > MOVE_THRESHOLD)

    const next = selectAnimation({ override: animationOverride.current, moving, })

    currentAnimation.current = playAnimation(next, currentAnimation.current, actions)

		// set previous position to current position for next frame
    prevPosition.current.copy(position)
  })

  return { triggerAnimation, clearOverride }
}