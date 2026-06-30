import { create } from 'zustand'
import type { GamePhase, GameState } from '../types/game'
import type { GuessResponse, NewGameResponse, PlayerPreview, PlayerStat } from '../types/api'

interface GameStore {
	gameState: GameState

	phase: GamePhase

  gameOngoing: boolean

  timeLeft: number
  score: number
  sessionToken: string | null
  gameId: number | null
  statCategory: string | null
  playerA: PlayerStat | null
  playerB: PlayerPreview | null
  playerBRevealed: PlayerStat | null

  nextRound: NewGameResponse | null

	setGameState: (state: GameState) => void

	setPhase: (phase: GamePhase) => void

  setGameOngoing: (gameOngoing: boolean) => void

  setTimeLeft: (time: number) => void
  setScore: (score: number) => void
  loadRound: (round: NewGameResponse) => void
  startGame: (round: NewGameResponse) => void
  revealPlayerB: (player: PlayerStat) => void
  reset: () => void

  setNextRound: (nextRound: NewGameResponse | null) => void

  setGuessResult: (guessResponse: GuessResponse) => void
}

export const useGameStore = create<GameStore>((set) => ({
	gameState: 'menu',

	phase: 'idle',

  gameOngoing: false,

  timeLeft: 5,
  score: 0,
  sessionToken: null,
  gameId: null,
  statCategory: null,
  playerA: null,
  playerB: null,
  playerBRevealed: null,

  nextRound: null,

	setGameState: (gameState) => set({ gameState }),

	setPhase: (phase) => set({ phase }),
  setGameOngoing: (gameOngoing) => set({ gameOngoing }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setScore: (score) => set({ score }),

  loadRound: (round) => set({
    sessionToken: round.session_token,
    gameId: round.game_id,
    statCategory: round.stat_category,
    playerA: round.player_a,
    playerB: round.player_b,
    playerBRevealed: null,
    timeLeft: 5,
    phase: 'playing',
    nextRound: null,
    gameOngoing: true
  }),

  startGame: (round) => set({
    sessionToken: round.session_token,
    gameId: round.game_id,
    statCategory: round.stat_category,
    playerA: round.player_a,
    playerB: round.player_b,
    playerBRevealed: null,
    timeLeft: 5,
    phase: 'intro',
    nextRound: null,
    gameOngoing: true
  }),

  revealPlayerB: (player) => set({ playerBRevealed: player }),

  reset: () => set({
    phase: 'idle',
    score: 0,
    timeLeft: 5,
    sessionToken: null,
    gameId: null,
    playerA: null,
    playerB: null,
    playerBRevealed: null
	}),

  setNextRound: (nextRound) => set({ nextRound }),

  setGuessResult: (guessResponse) => set({
    playerBRevealed: guessResponse.player_b,
    nextRound: guessResponse.next_round,
    score: guessResponse.score,
    gameOngoing: guessResponse.session_active,
    phase: 'revealing'
  })
}))