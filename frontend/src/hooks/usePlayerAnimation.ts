import * as THREE from "three"
import type { AnimationName } from "../types/game"

type AnimationConditions = {
  override: AnimationName | null
  moving: boolean
}

const FADE_DURATION = 0.2
const MOVE_THRESHOLD = 0.001

function playAnimation(
  name: AnimationName,
  actions: Partial<Record<string, THREE.AnimationAction>>,
  current: React.RefObject<AnimationName>
) {
	// if animation is already playing, return
  if (current.current === name) 
		return

  actions[current.current]?.fadeOut(FADE_DURATION)
  actions[name]?.reset().fadeIn(FADE_DURATION).play()

  current.current = name
}

function isMoving(playerRef: React.RefObject<THREE.Group | null>, prev: THREE.Vector3): boolean {
  if (!playerRef.current) 
		return false
	
  return playerRef.current.position.distanceTo(prev) > MOVE_THRESHOLD
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
	actions: Partial<Record<string, THREE.AnimationAction>>
}

export function usePlayerAnimation({ actions, playerRef }: Props) {}