import { useCallback } from "react"
import { useGameStore } from "../stores/useGameStore"
import { startGame, submitGuess } from "../api/game"
import { useSettingsStore } from "../stores/useSettingsStore"

export function useGameEngine() {
	const loadRound = useGameStore((state) => state.loadRound)
	const setGameState = useGameStore((state) => state.setGameState)
	const setPhase = useGameStore((state) => state.setPhase)
	
	const setGuessResult = useGameStore((state) => state.setGuessResult)

	const handleStartGame = useCallback(async () => {
		try {
			const startGameOptions = useSettingsStore.getState().getGameRequest()

			const round = await startGame(startGameOptions)

			console.log('start round:', round)
			loadRound(round)
			setGameState('playing')
		} catch (e) {
			console.error('failed to start game:', e)
		}
	}, [loadRound, setGameState])

	const handleGuess = useCallback(async (isAOverB: boolean) => {
		try {
			const { sessionToken, gameId, phase } = useGameStore.getState()

			if (!sessionToken || !gameId || phase !== 'playing')
				return

			const newRound = await submitGuess({
				session_token: sessionToken,
				game_id: gameId,
				is_a_over_b: isAOverB
			})
			console.log('successful guess:', newRound)
			// refer to game store to see what this sets
			setGuessResult(newRound)
		} catch (e) {
			console.error('failed to submit guess:', e)
		}
	}, [setGuessResult])

	const handleNextRound = useCallback(async () => {
		const { nextRound } = useGameStore.getState()

		if (nextRound) {
			loadRound(nextRound)
		} else {
			setGameState('gameover')
			setPhase('gameover')
		}
	}, [loadRound, setGameState, setPhase])

	return { handleStartGame, handleGuess, handleNextRound }
}