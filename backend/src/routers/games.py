from fastapi import APIRouter, Depends
from sqlmodel import SQLModel, Session
from src.schemas import GetGameSessionResponse, GuessRequest, GuessResponse, NewGameResponse, StartGameRequest
from src.services.game_service import GameService
from src.database import get_session

router = APIRouter(
    prefix="/game",
    tags=["game"]
)


@router.post("/start/{type}/{category}", response_model=NewGameResponse)
async def start_game(category: str, type: str, body: StartGameRequest, session: Session = Depends(get_session)):
    return GameService.start_game(category, type, body, session)

@router.post("/guess", response_model=GuessResponse)
async def game_guess(req: GuessRequest, session: Session = Depends(get_session)):
    return GameService.game_guess(req, session)

@router.get("/{session_token}", response_model=GetGameSessionResponse)
async def game_guess(session_token: str, session: Session = Depends(get_session)):
    return GameService.get_game(session_token, session)