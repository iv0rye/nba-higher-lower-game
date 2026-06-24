export interface PlayerPreview {
  id: number
  name: string
  photo_url: string | null
  team: string | null
  season: string | null
  stat_category: string
}

export interface PlayerStat extends PlayerPreview {
  stat_value: number
}

export interface NewGameResponse {
  session_token: string
  game_id: number
  stat_category: string
  stat_type: string
  player_a: PlayerStat
  player_b: PlayerPreview
}

export interface GuessResponse {
  is_correct: boolean
  score: number
  session_active: boolean
  player_b: PlayerStat
  next_round: NewGameResponse | null
}

export interface StartGameRequest {
  seasons: string[]
}

export interface GuessRequest {
  session_token: string
  game_id: number
  is_a_over_b: boolean
}