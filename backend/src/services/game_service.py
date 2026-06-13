from sqlmodel import select
from src.models import GameSession, Season
from src.routers.games import StartGameRequest


class GameService:
    @staticmethod
    def start_game(cat: str, stat_type: str, body: StartGameRequest, session):
        game_seasons: list[Season] = session.exec(
            select(Season)
            .where(Season.label.in_(body.seasons))
        ).all()

        new_game_session = GameSession(
            score=0,
            is_active=True,
            stat_category=cat,
            stat_type=stat_type,
            seasons=game_seasons
        )

        session.add(new_game_session)
        session.commit()

        session.refresh(new_game_session)
        return