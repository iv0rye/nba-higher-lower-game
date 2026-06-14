from sqlmodel import SQLModel

class StartGameRequest(SQLModel):
    seasons: list[str] | None = []

class StartGameResponse(SQLModel):
    seasons: list[str] | None = []