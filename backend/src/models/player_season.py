from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

class PlayerSeasonBase(SQLModel):
    season: str
    team: str | None = None

    season_ppg: float | None = None
    season_apg: float | None = None
    season_rpg: float | None = None
    season_spg: float | None = None
    season_bpg: float | None = None

    season_three_pm: float | None = None
    
    season_fg_percentage: float | None = None
    season_three_percentage: float | None = None
    season_ft_percentage: float | None = None


class PlayerSeason(PlayerSeasonBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    player_id: int = Field(foreign_key="player.id")
    player: Optional["Player"] = Relationship(back_populates="seasons")


class PlayerSeasonRead(PlayerSeasonBase):
    id: int