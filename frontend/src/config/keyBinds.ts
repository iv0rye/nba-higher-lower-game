import type { GameKey } from "../types/game"

// Adding keybinds: Add name to keybinds interface then default key into default_bindings
export interface keyBinds {
  forward: GameKey[]
  backward: GameKey[]
  left: GameKey[]
  right: GameKey[]
}

export const DEFAULT_BINDINGS: keyBinds = {
  forward: ['w', 'arrowup'] as GameKey[],
  backward: ['s', 'arrowdown'] as GameKey[],
  left: ['a', 'arrowleft'] as GameKey[],
  right: ['d', 'arrowright'] as GameKey[]
}

export function isActionActive(
  keys: Partial<Record<GameKey, { pressed: boolean }>>,
  bindings: GameKey[]
): boolean {
  return bindings.some(key => keys[key]?.pressed)
}
