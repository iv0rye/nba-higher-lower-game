import { createContext, useContext } from 'react'
import { type KeysRef } from '../types/game'

export const KeysContext = createContext<KeysRef>({ current: {} })

export function useKeysContext() {
  return useContext(KeysContext)
}