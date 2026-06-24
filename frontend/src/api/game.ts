import type { GuessRequest, GuessResponse, NewGameResponse } from "../types/api"

const BACKEND_URL = 'http://localhost:8000'

export async function startGame(
  type: string,
  category: string,
  seasons: string[] = []
): Promise<NewGameResponse> {
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