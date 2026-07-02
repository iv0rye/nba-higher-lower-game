const HIGH_SCORE_KEY = 'nba_higher_lower_high_score'

export function getHighScore(): number {
  const stored = localStorage.getItem(HIGH_SCORE_KEY)

  return stored ? parseInt(stored) : 0
}

export function saveHighScore(score: number): void {
  const current = getHighScore()

  if (score > current) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString())
  }
}