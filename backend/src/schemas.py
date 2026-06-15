from datetime import datetime
from sqlmodel import SQLModel
from src.models.game import GameBase, GameSessionBase
from src.models.season import SeasonBase

class StartGameRequest(SQLModel):
    seasons: list[str] | None = []


class PlayerPreviewRead(SQLModel):
    id: int
    name: str
    photo_url: str | None = None
    team: str | None = None
    season: str | None = None
    stat_category: str


class PlayerStatRead(PlayerPreviewRead):
    stat_value: float | int


# realistically this is new **round** of a game, but its too much effort to change naming conventions
# so probably changing the names is a TODO
class NewGameResponse(SQLModel):
    session_token: str
    game_id: int
    stat_category: str
    stat_type: str
    player_a: PlayerStatRead
    player_b: PlayerPreviewRead


class GuessRequest(SQLModel):
    session_token: str
    game_id: int
    is_a_over_b: bool


class GuessResponse(SQLModel):
    is_correct: bool
    score: int
    session_active: bool
    player_b: PlayerStatRead
    next_round: NewGameResponse | None = None


class GetGameRoundResponse(GameBase):
    id: int
    session_id: int
    player_a: PlayerStatRead
    player_b: PlayerStatRead


class GetSeasonResponse(SeasonBase):
    id: int


class GetGameSessionResponse(GameSessionBase):
    id: int
    session_token: str
    created_at: datetime

    rounds: list[GetGameRoundResponse] 
    seasons: list[GetSeasonResponse]
    