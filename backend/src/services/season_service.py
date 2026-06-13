from typing import Any
from sqlmodel import func, select
from src.models.player_season import PlayerSeason


class SeasonService:
    @staticmethod
    def get_seasons(seasons: list[str] | None, session):
        statement = select(PlayerSeason)

        if not seasons:
            return session.exec(statement).all()
        
        statement = statement.where(PlayerSeason.season.in_(seasons))

        return session.exec(statement).all()

        
        
        
