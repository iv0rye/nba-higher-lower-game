import type { RefObject } from "react"

/**
 * KeyBind Related
 */
export const GAME_KEYS = [
  'w', 'a', 's', 'd',
  'arrowup', 'arrowdown', 'arrowleft', 'arrowright'
] as const

export type GameKey = typeof GAME_KEYS[number]

export interface KeyState {
  pressed: boolean      // key is pressed in current frame
  justPressed: boolean  // true for one frame after key press
  justReleased: boolean // true for one frame after key release
  holdDuration: number  // ms duration key has been held
}

export type KeysRef = RefObject<Partial<Record<GameKey, KeyState>>>

/**
 * Animation Related
 */
export const ANIMATIONS = [
  'CharacterArmature|Idle',
  'CharacterArmature|Run',
  'CharacterArmature|Victory',
  'CharacterArmature|Death',
  'CharacterArmature|Defeat',
] as const

export type AnimationName = typeof ANIMATIONS[number]

/**
 * Game loop related
 */
export type GameState = 'menu' | 'playing' | 'gameover'
