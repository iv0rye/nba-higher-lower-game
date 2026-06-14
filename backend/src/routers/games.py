from fastapi import APIRouter, Depends
from sqlmodel import SQLModel, Session
from src.schemas import NewGameResponse, StartGameRequest
from src.services.game_service import GameService
from src.database import get_session

router = APIRouter(
    prefix="/game",
    tags=["game"]
)


@router.post("/start/{type}/{category}", response_model=NewGameResponse)
async def start_game(category: str, type: str, body: StartGameRequest, session: Session = Depends(get_session)):
    return GameService.start_game(category, type, body, session)

@router.post("/guess/{token}/{is_a_over_b}", response_model=NewGameResponse)
async def game_guess(token: str, is_a_over_b: bool, session: Session = Depends(get_session)):
    return GameService.game_guess(token, is_a_over_b, session)