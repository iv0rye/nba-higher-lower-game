from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.models.player import PlayerRead
from src.database import get_session
from src.services.player_service import PlayerService

router = APIRouter(
    prefix="/players",
    tags=["players"]
)

@router.get("/", response_model=list[PlayerRead])
async def get_players(player_name: str | None = None, session: Session = Depends(get_session)):
    return PlayerService.get_players(player_name, session)