from sqlmodel import SQLModel

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