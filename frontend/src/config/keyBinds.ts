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