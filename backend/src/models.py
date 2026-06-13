from datetime import datetime
import uuid

from sqlmodel import Field, Relationship, SQLModel

class Player(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nba_id: int = Field(unique=True)
    name: str
    positions: str | None = None
    is_active: bool = True
    photo_url: str | None = None

    # career stats
    total_games_played: int | None = None
    seasons_played: int | None = None

    # total stats
    career_pts: int | None = None
    career_ast: int | None = None
    career_reb: int | None = None
    career_stl: int | None = None
    career_blk: int | None = None

    career_three_pm: int | None = None
    career_fgm: int | None = None
    career_ftm: int | None = None

    # average stats
    career_ppg: float | None = None
    career_apg: float | None = None
    career_rpg: float | None = None
    career_spg: float | None = None
    career_bpg: float | None = None

    career_fg_percentage: float | None = None
    career_three_percentage: float | None = None
    career_ft_percentage: float | None = None

    # linking relationships for easier queries
    seasons: list["PlayerSeason"] = Relationship(back_populates="player")

# 1 to many between Player, PlayerSeason
class PlayerSeason(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    player_id: int = Field(foreign_key="player.id")
    season: str
    team: str | None = None

    # testable statistics
    season_ppg: float | None = None
    season_apg: float | None = None
    season_rpg: float | None = None
    season_spg: float | None = None
    season_bpg: float | None = None
    season_three_pm: float | None = None

    season_fg_percentage: float | None = None
    season_three_percentage: float | None = None
    season_ft_percentage: float | None = None

    player: Player | None = Relationship(back_populates="seasons")

# game data model
# TODO: add expiry system to clean database from old game sessions/games
class GameSession(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_token: str = Field(default_factory=lambda: str(uuid.uuid4()), unique=True)
    score: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now())

    rounds: list["Game"] = Relationship(back_populates="session")


class Game(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="gamesession.id")
    player_a_id: int = Field(foreign_key="player.id")
    player_b_id: int = Field(foreign_key="player.id")
    stat_category: str
    stat_type: str
    season: str | None = None
    guess: str | None = None
    is_correct: bool | None = None

    session: GameSession | None = Relationship(back_populates="rounds")
    player_a: Player | None = Relationship(
        sa_relationship_kwargs={"foreign_keys": "Game.player_a_id"}
    )
    player_b: Player | None = Relationship(
        sa_relationship_kwargs={"foreign_keys": "Game.player_b_id"}
    )


class ScoreCount(SQLModel, table=True):
    score: int = Field(primary_key=True)
    count: int = 0
