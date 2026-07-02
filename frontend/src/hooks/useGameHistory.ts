import { useEffect, useState } from 'react'
import { getGameSession } from '../api/game'
import { type GetGameSessionResponse } from '../types/api'

export function useGameHistory(sessionToken: string | null) {
  const [history, setHistory] = useState<GetGameSessionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!sessionToken) return

    setLoading(true)
    setError(false)
		
    getGameSession(sessionToken)
      .then(setHistory)
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [sessionToken])

  return { history, loading, error }
}