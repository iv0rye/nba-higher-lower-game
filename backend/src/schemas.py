from sqlmodel import SQLModel

class StartGameRequest(SQLModel):
    seasons: list[str] | None = []


class PlayerStatOut(SQLModel):
    id: int
    name: str
    team: str | None = None
    stat_category: str
    stat_value: float | int

# realistically this is new **round** of a game, but its too much effort to change naming conventions
# so probably changing the names is a TODO
class NewGameResponse(SQLModel):
    session_token: str
    stat_category: str
    stat_type: str
    player_a: PlayerStatOut