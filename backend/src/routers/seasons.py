from typing import Annotated
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from src.database import get_session
from src.services.season_service import SeasonService
from src.models import SeasonRead

router = APIRouter(
    prefix="/seasons",
    tags=["seasons"]
)

@router.get("/", response_model=list[SeasonRead])
async def get_seasons(season: Annotated[list[str] | None, Query()] = None, session: Session = Depends(get_session)):
    return SeasonService.get_seasons_by_label(season, session)