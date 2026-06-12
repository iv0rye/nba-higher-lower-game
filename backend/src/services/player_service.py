from typing import Any

from sqlmodel import select
from src.models import Player


class PlayerService:
    @staticmethod
    def get_players(session, sort_category: Any, limit: int = 50):
        return session.exec(
            select(Player)
            .order_by(Player.sort_category.desc())
            .limit(limit)
        ).all()
