from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.database import get_session
from src.services.player_service import PlayerService

router = APIRouter(
    prefix="/players",
    tags=["players"]
)

@router.get("/")
async def get_players(name: str | None = None, session: Session = Depends(get_session)):
    return PlayerService.get_players(name, session)