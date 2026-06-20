import { GAME_KEYS } from "../types/game"

interface KeyState {
  pressed: boolean      // key is pressed in current frame
  justPressed: boolean  // true for one frame after key press
  justReleased: boolean // true for one frame after key release
  holdDuration: number  // ms duration key has been held
}

// NOTE: to add a new key to be used in the game, please add it in the game keys type
const GAME_KEYS_SET = new Set<string>(GAME_KEYS)