from fastapi import APIRouter
from services import player_service

router = APIRouter(
    prefix="/players",
    tags=["players"]
)

@router.get("/")
async def get_players(q: str | None = None):
    return player_service.get_players(q)