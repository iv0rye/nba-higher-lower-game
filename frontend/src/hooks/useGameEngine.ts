import { useCallback } from "react"
import { useGameStore } from "../stores/useGameStore"
import { startGame } from "../api/game"
import { useSettingsStore } from "../stores/useSettingsStore"

interface GameEngineProps {
}

export function useGameEngine({  }: GameEngineProps) {
	const loadRound     = useGameStore((state) => state.loadRound)
	const setGameState  = useGameStore((state) => state.setGameState)

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

	return { handleStartGame }
}