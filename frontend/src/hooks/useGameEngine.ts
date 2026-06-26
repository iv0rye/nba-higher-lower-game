import { useCallback } from "react"
import { useGameStore } from "../stores/useGameStore"
import { startGame } from "../api/game"
import type { StartGameRequest } from "../types/api"

interface GameEngineProps {
	startGameOptions: StartGameRequest
}

export function useGameEngine({ startGameOptions }: GameEngineProps) {
	const loadRound     = useGameStore((state) => state.loadRound)
	const setGameState  = useGameStore((state) => state.setGameState)

	const handleStartGame = useCallback(async () => {
		try {
			const round = await startGame(startGameOptions)
			console.log('start round:', round)
			loadRound(round)
			setGameState('playing')
		} catch (e) {
			console.error('failed to start game:', e)
		}
	}, [startGameOptions])

	return { handleStartGame }
}