import { useEffect, useState } from 'react'
import { getGameSession } from '../api/game'
import { type GetGameSessionResponse } from '../types/api'

export function useGameHistory(sessionToken: string | null) {
  const [history, setHistory] = useState<GetGameSessionResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!sessionToken) return

    setLoading(true)
		
    getGameSession(sessionToken)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [sessionToken])

  return { history, loading }
}