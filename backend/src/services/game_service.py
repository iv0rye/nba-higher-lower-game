import random

from fastapi import HTTPException
from sqlmodel import select
from models import Player, PlayerSeason
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
    def generate_new_game(session_token: str, session):
        cur_session = session.exec(
            select(GameSession)
            .where(GameSession.session_token == session_token)
        ).one_or_none()

        if not cur_session:
            raise HTTPException(status_code=404, detail="Session token invalid")
        
        # find seen players to filter out of new player list
        seen_players = []
        for game_round in cur_session.rounds:
            seen_players.append(game_round.player_a_id)
            seen_players.append(game_round.player_b_id)

        # find new players
        if cur_session.stat_type.lower() == "career":
            player_a, player_b = GameService.generate_players_career(
                cur_session.stat_category, 
                seen_players,
                session
            )
        elif cur_session.stat_type.lower() == "season":
            player_a, player_b = GameService.generate_players_season(
                cur_session.stat_category, 
                seen_players,
                session
            )
        else:
            raise HTTPException(status_code=404, detail=f"Game session entry {cur_session.id} has invalid stat type")
        
        new_game = Game(
            guess_a_higher_b=None,
            is_correct=None,
            session_id=cur_session.id,
            player_a_id=player_a.id,
            player_b_id=player_b.id
        )


    @staticmethod
    def generate_players_career(cat: str, seen_players: list[int], session) -> tuple[Player, Player]: 
        """
        helper function to generate random player[s] based on a career based game session
        """    
        if cat not in CAREER_STAT_CATEGORIES:
            raise HTTPException(status_code=404, detail="Career category type is invalid")
        
        # get top 100 players of specified career cat
        attr_name = f"career_{cat}"
        cat_col = getattr(Player, attr_name)

        available_players = session.exec(
            select(Player)
            .order_by(cat_col.desc())
            .limit(100)
        ).all()
        
        return GameService.select_players(available_players, seen_players, session)
        

    @staticmethod
    def generate_players_season(cat: str, seen_players: list[int], seasons: list[int], session) -> tuple[Player, Player]:
        """
        helper function to generate random player[s] based on a season based game session
        """
        if cat not in SEASON_STAT_CATEGORIES:
            raise HTTPException(status_code=404, detail="Season category type is invalid")

        attr_name = f"season_{cat}"
        cat_col = getattr(PlayerSeason, attr_name)

        season = random.choice(seasons)

        # get top 100 players of specified career cat
        available_players = session.exec(
            select(Player)
            .join(PlayerSeason, PlayerSeason.player_id == Player.id)
            .where(PlayerSeason.season_id == season.id)
            .order_by(cat_col.desc())
            .limit(50)
        ).all()

        return GameService.select_players(available_players, seen_players, session)


    @staticmethod
    def select_players(available_players: list[Player], seen_players: list[int], session) -> tuple[Player, Player]:
        """
        helper function to select random player[s] (depending on whether seen_players exist or not (implying if game is new or not))
        """
        # return 2 random players if no seen players, AKA new game
        if not seen_players:
            player_a, player_b = random.sample(available_players, 2)
            return (player_a, player_b)

        available_players = [p for p in available_players if p.id not in seen_players]

        if not available_players:
            raise HTTPException(status_code=409, detail="No more players available")

        player_a = session.get(Player, seen_players[-1])
        player_b = random.choice(available_players)

        return (player_a, player_b)