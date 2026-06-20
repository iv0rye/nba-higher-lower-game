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