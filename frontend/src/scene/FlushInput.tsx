import { useFrame } from '@react-three/fiber'
import { useKeysContext } from '../context/keysContext'
import { type GameKey } from '../types/game'
import { FRAME_PRIORITIES } from '../config/framePriorities'

export default function InputFlusher() {
  const keys = useKeysContext()

  useFrame(() => {
    let key: GameKey
    for (key in keys.current) {
      const state = keys.current[key]
      if (state) {
        state.justPressed = false
        state.justReleased = false
      }
    }
  }, FRAME_PRIORITIES.INPUT_FLUSH)

  return null
}