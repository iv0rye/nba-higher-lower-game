from datetime import datetime
from typing import Optional
import uuid
from sqlmodel import Field, Relationship, SQLModel
from .game_season import GameSessionSeason

# base classes
class GameSessionBase(SQLModel):
    score: int = 0
    is_active: bool = True
    stat_category: str
    stat_type: str
    

class GameBase(SQLModel):
    guess_a_higher_b: bool | None = None
    is_correct: bool | None = None

# sql tables
# TODO: add expiry system to clean database from old game sessions/games
class GameSession(GameSessionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_token: str = Field(default_factory=lambda: str(uuid.uuid4()), unique=True)
    created_at: datetime = Field(default_factory=datetime.now)

    rounds: list["Game"] = Relationship(back_populates="session")
    seasons: list["Season"] = Relationship(back_populates="sessions", link_model=GameSessionSeason) # type: ignore (forward depency resolution)


class Game(GameBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="gamesession.id")
    player_a_id: int = Field(foreign_key="player.id")
    player_b_id: int = Field(foreign_key="player.id")
    player_season_a_id: int | None = Field(default=None, foreign_key="playerseason.id")
    player_season_b_id: int | None = Field(default=None, foreign_key="playerseason.id")

    session: GameSession | None = Relationship(back_populates="rounds")
    
    player_a: Optional["Player"] = Relationship(                            # type: ignore (forward depency resolution)
        sa_relationship_kwargs={"foreign_keys": "Game.player_a_id"}
    )
    player_b: Optional["Player"] = Relationship(                            # type: ignore (forward depency resolution)
        sa_relationship_kwargs={"foreign_keys": "Game.player_b_id"}
    )   
    player_season_a: Optional["PlayerSeason"] = Relationship(               # type: ignore (forward depency resolution)
        sa_relationship_kwargs={"foreign_keys": "Game.player_season_a_id"}
    )           
    player_season_b: Optional["PlayerSeason"] = Relationship(               # type: ignore (forward depency resolution)
        sa_relationship_kwargs={"foreign_keys": "Game.player_season_b_id"}
    )


class ScoreCount(SQLModel, table=True):
    score: int = Field(primary_key=True)
    count: int = 0

# pydantics
class GameSessionRead(GameSessionBase):
    id: int
    session_token: str
    created_at: datetime
    

class GameRead(GameBase):
    id: int
    session_id: int
    player_a_id: int
    player_b_id: int


