from sqlmodel import Field, Relationship, SQLModel

class SeasonBase(SQLModel):
    label: str
    year_start: int
    year_end: int


class Season(SeasonBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    player_seasons: list["PlayerSeason"] = Relationship(back_populates="season")


class SeasonRead(SeasonBase):
    id: int
    player_seasons: list["SeasonPlayerRead"] = []