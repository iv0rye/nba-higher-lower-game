from typing import Any

from sqlmodel import func, select
from src.models.player import Player


class PlayerService:
    @staticmethod
    def get_players(name: str | None, session):
        statement = select(Player)

        if name:
            statement = statement.where(func.upper(Player.name).contains(func.upper(name)))
        
        return session.exec(statement).all()
