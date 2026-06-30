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
 * Game state is for menu vs playing, game phase is for phases of gameplay
 */
const GameState = {
  Menu: 'menu',
  Playing: 'playing',
  GameOver: 'gameover',
} as const

const GamePhase = {
  Idle: 'idle',
  Intro: 'intro',
  Playing: 'playing',
  Revealing: 'revealing',
  GameOver: 'gameover',
} as const

export type GameState = typeof GameState[keyof typeof GameState]
export type GamePhase = typeof GamePhase[keyof typeof GamePhase]
