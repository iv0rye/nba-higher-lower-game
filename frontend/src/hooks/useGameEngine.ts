import { useCallback } from "react"
import { useGameStore } from "../stores/useGameStore"
import { startGame, submitGuess } from "../api/game"
import { useSettingsStore } from "../stores/useSettingsStore"

interface GameEngineProps {
}

export function useGameEngine({  }: GameEngineProps) {
	const loadRound = useGameStore((state) => state.loadRound)
	const setGameState = useGameStore((state) => state.setGameState)
	const revealPlayerB = useGameStore((state) => state.revealPlayerB)
	const setNextRound = useGameStore((state) => state.setNextRound)
	const setScore = useGameStore((state) => state.setScore)
	const setPhase = useGameStore((state) => state.setPhase)
	const setGameOngoing = useGameStore((state) => state.setGameOngoing)

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

			revealPlayerB(newRound.player_b)

			setNextRound(newRound.next_round)
			setScore(newRound.score)
			setGameOngoing(newRound.session_active)
			setPhase('revealing')

		} catch (e) {
			console.error('failed to submit guess:', e)
		}
	}, [])

	return { handleStartGame, handleGuess }
}