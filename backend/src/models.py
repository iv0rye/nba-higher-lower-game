from sqlmodel import Field, Relationship, SQLModel

class Player(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nba_id: int = Field(unique=True)
    name: str
    positions: str | None = None
    is_active: bool = True
    is_all_star: bool = False
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
    points_per_game: float | None = None
    assists_per_game: float | None = None
    rebounds_per_game: float | None = None
    steals_per_game: float | None = None
    blocks_per_game: float | None = None
    three_pm_per_game: float | None = None

    field_goal_percentage: float | None = None
    three_point_percentage: float | None = None
    free_throw_percentage: float | None = None

    player: Player | None = Relationship(back_populates="seasons")