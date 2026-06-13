from fastapi import APIRouter

router = APIRouter(
    prefix="/game",
    tags=["game"]
)

@router.post("/start/{category}/{type}")
async def start_game(category: str, type: str):
    return