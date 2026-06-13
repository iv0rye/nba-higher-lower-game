from fastapi import APIRouter, Depends
from sqlmodel import SQLModel, Session
from src.database import get_session

router = APIRouter(
    prefix="/game",
    tags=["game"]
)

class StartGameRequest(SQLModel):
    seasons: list[str] = []

@router.post("/start/{category}/{type}")
async def start_game(category: str, type: str, body: StartGameRequest, session: Session = Depends(get_session)):
    return