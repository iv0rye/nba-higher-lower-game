from fastapi import APIRouter, Depends
from sqlmodel import SQLModel, Session
from src.schemas import StartGameRequest
from src.services.game_service import GameService
from src.database import get_session

router = APIRouter(
    prefix="/game",
    tags=["game"]
)


@router.post("/start/{type}/{category}")
async def start_game(category: str, type: str, body: StartGameRequest, session: Session = Depends(get_session)):
    return GameService.start_game(category, type, body, session)