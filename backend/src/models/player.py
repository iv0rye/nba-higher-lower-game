from sqlmodel import Field, Relationship, SQLModel
from .player_season import PlayerSeason
from .player_season import PlayerSeasonRead

# set to validate stat category
CAREER_STAT_CATEGORIES = {
    "pts", "ast", "reb", "stl", "blk", "three_pm", "fgm", "ftm",
    "ppg", "apg", "rpg", "spg", "bpg", "fg_percentage", "three_percentage", "ft_percentage"
}

class PlayerBase(SQLModel):
    nba_id: int = Field(unique=True)
    name: str
    positions: str | None = None
    is_active: bool = True
    photo_url: str | None = None

    total_games_played: int | None = None
    seasons_played: int | None = None

    career_pts: int | None = None
    career_ast: int | None = None
    career_reb: int | None = None
    career_stl: int | None = None
    career_blk: int | None = None

    career_three_pm: int | None = None
    career_fgm: int | None = None
    career_ftm: int | None = None

    career_ppg: float | None = None
    career_apg: float | None = None
    career_rpg: float | None = None
    career_spg: float | None = None
    career_bpg: float | None = None

    career_fg_percentage: float | None = None
    career_three_percentage: float | None = None
    career_ft_percentage: float | None = None


class Player(PlayerBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    seasons: list["PlayerSeason"] = Relationship(back_populates="player")


class PlayerRead(PlayerBase):
    id: int
    seasons: list[PlayerSeasonRead] = []