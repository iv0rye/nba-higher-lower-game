from typing import Any
from sqlmodel import func, select
from src.models import Season


class SeasonService:
    @staticmethod
    def get_seasons(session):
        return session.exec(select(Season)).all()
    
    @staticmethod
    def get_seasons_by_label(seasons: list[str] | None, session):
        statement = select(Season)

        if not seasons:
            return session.exec(statement).all()
        
        statement = statement.where(Season.label.in_(seasons))

        return session.exec(statement).all()

        
        
        
