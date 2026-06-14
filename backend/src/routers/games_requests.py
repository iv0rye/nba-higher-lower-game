from sqlmodel import SQLModel

class StartGameRequest(SQLModel):
    seasons: list[str] | None = []