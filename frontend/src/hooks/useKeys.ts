import { useEffect, useRef } from "react"
import { GAME_KEYS, type GameKey, type KeyState } from "../types/game"

// NOTE: to add a new key to be used in the game, please add it in the game keys type
const GAME_KEY_SET = new Set<string>(GAME_KEYS)

export function useKeys() {
  const keys = useRef<Partial<Record<GameKey, KeyState>>>({})
  const pressTime = useRef<Partial<Record<GameKey, number>>>({})

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
			// returns if key is not recognised as being used in the game (for optimization reasons)
      if (!GAME_KEY_SET.has(key)) return

      const gameKey = key as GameKey
			// returns if key is pressed (to enforce hold vs press)
      if (keys.current[gameKey]?.pressed) return

      pressTime.current[gameKey] = performance.now()

      keys.current[gameKey] = {
        pressed: true,
        justPressed: true,
        justReleased: false,
        holdDuration: 0,
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!GAME_KEY_SET.has(key)) return

      const gameKey = key as GameKey

      keys.current[gameKey] = {
        pressed: false,
        justPressed: false,
        justReleased: true,
        holdDuration: performance.now() - (pressTime.current[gameKey] ?? 0),
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])
	
  return { keys }
}