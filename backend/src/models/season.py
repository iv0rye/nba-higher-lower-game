from sqlmodel import Field, SQLModel

class SeasonBase(SQLModel):
    label: str
    year_start: int
    year_end: int


class Season(SeasonBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class SeasonRead(SeasonBase):
    id: int
    player_seasons: list["PlayerSeasonRead"] = []