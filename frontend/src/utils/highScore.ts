// src/utils/highScore.ts
const getKey = (category: string) => 
  `nba_higher_lower_high_score_${category}`

export function getHighScore(category: string | null): number {
  if (!category) return 0

  const stored = localStorage.getItem(getKey(category))

  return stored ? parseInt(stored) : 0
}

export function saveHighScore(score: number, category: string | null): void {
	if (!category) return

  const current = getHighScore(category)

  if (score > current) {
    localStorage.setItem(getKey(category), score.toString())
  }
}