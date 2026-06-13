from fastapi import HTTPException
from sqlmodel import select
from models import Player
from models.player import CAREER_STAT_CATEGORIES
from models.player_season import SEASON_STAT_CATEGORIES
from src.models import GameSession, Season, Game
from src.routers.games import StartGameRequest


class GameService:
    CURRENT_SEASON = '2025-26'

    @staticmethod
    def start_game(cat: str, stat_type: str, body: StartGameRequest, session):
        if not body.seasons or len(body.seasons) <= 0:
            game_seasons: list[Season] = session.exec(
                select(Season)
                .where(Season.label == GameService.CURRENT_SEASON)
            ).all()
        else:
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
        #TODO: use generate new game here and return results
        return
    
    @staticmethod
    def generate_new_game(session_token: str, session, previous_game: id | None = None):
        cur_session = session.exec(
            select(GameSession)
            .where(GameSession.session_token == session_token)
        ).one_or_none()

        if not cur_session:
            raise HTTPException(status_code=404, detail="Session token invalid")

        players = session.exec(
            select(Player)
            .where(GameSession.session_token == session_token)
        ).all()
        
        if not previous_game:
            players = session.exec(
                select(GameSession)
                .where(GameSession.session_token == session_token)
            ).all()

        next_game = Game(
            session_id=cur_session.id,
            
        )

    @staticmethod
    def generate_players_in_category(cat: str, session_type: str, session):
        if session_type == "career":
            if cat not in CAREER_STAT_CATEGORIES:
                raise HTTPException(status_code=404, detail="Career category type is invalid")
            
        elif session_type == "season":
            if cat not in SEASON_STAT_CATEGORIES:
                raise HTTPException(status_code=404, detail="Season category type is invalid")
            
        else:
            raise HTTPException(status_code=404, detail="Game session type is invalid")



