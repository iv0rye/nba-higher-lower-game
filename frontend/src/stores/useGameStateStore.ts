import { create } from 'zustand'
import type { GameState } from '../types/game'

interface GameStore {
	gameState: GameState
	setGameState: (state: GameState) => void
}

export const useGameStateStore = create<GameStore>((set) => ({
	gameState: 'menu',
	setGameState: (gameState) => set({ gameState })
}))