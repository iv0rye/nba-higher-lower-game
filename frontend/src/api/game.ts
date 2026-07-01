import type { GetGameSessionResponse, GuessRequest, GuessResponse, NewGameResponse, StartGameRequest } from "../types/api"

const BACKEND_URL = 'http://localhost:8000'

export async function startGame(req: StartGameRequest): Promise<NewGameResponse> {
  const { type, category, seasons = [] } = req

  const res = await fetch(`${BACKEND_URL}/game/start/${type}/${category}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seasons }),
  })

  if (!res.ok) 
    throw new Error('Failed to start game')

  return res.json()
}

export async function submitGuess(req: GuessRequest): Promise<GuessResponse> {
  const res = await fetch(`${BACKEND_URL}/game/guess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  if (!res.ok) 
    throw new Error('Failed to submit guess')

  return res.json()
}

export async function getGameSession(sessionToken: string): Promise<GetGameSessionResponse> {
  const res = await fetch(`${BACKEND_URL}/game/${sessionToken}`)

  if (!res.ok) 
    throw new Error('Failed to fetch game session')
  
  return res.json()
}