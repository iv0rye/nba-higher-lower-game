from sqlmodel import Field, Relationship, SQLModel

from .game_season import GameSessionSeason

class SeasonBase(SQLModel):
    label: str
    year_start: int
    year_end: int


class Season(SeasonBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    player_seasons: list["PlayerSeason"] = Relationship(back_populates="season")                            # type: ignore (forward depency resolution)
    sessions: list["GameSession"] = Relationship(back_populates="seasons", link_model=GameSessionSeason)    # type: ignore (forward depency resolution)

class SeasonRead(SeasonBase):
    id: int
    player_seasons: list["SeasonPlayerRead"] = []   # type: ignore (forward depency resolution)