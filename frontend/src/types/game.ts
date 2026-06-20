export const GAME_KEYS = [
  'w', 'a', 's', 'd',
  'arrowup', 'arrowdown', 'arrowleft', 'arrowright'
] as const

export type GameKey = typeof GAME_KEYS[number]