from sqlmodel import Field, SQLModel


class GameSessionSeasonBase(SQLModel):
    game_session_id: int = Field(foreign_key="gamesession.id", primary_key=True)
    season_id: int = Field(foreign_key="season.id", primary_key=True)


class GameSessionSeason(GameSessionSeasonBase, table=True):
    pass