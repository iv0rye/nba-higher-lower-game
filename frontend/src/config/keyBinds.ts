import type { GameKey } from "../types/game"

// Adding keybinds: Add name to keybinds interface then default key into default_bindings
export interface keyBinds {
  forward: string[]
  backward: string[]
  left: string[]
  right: string[]
}

export const DEFAULT_BINDINGS: keyBinds = {
  forward: ['w', 'arrowup'],
  backward: ['s', 'arrowdown'],
  left: ['a', 'arrowleft'],
  right: ['d', 'arrowright']
}

export function isActionActive(
  keys: Partial<Record<GameKey, { pressed: boolean }>>,
  bindings: GameKey[]
): boolean {
  return bindings.some(key => keys[key]?.pressed)
}
