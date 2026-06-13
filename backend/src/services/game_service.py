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
        player_a, player_b = GameService.generate_player_in_category(
            cur_session.stat_category, 
            cur_session.stat_type, 
            seen_players,
            session
        )

        a_higher_b: bool = True if player_a.

        new_game = Game(
            guess_a_higher_b=None,
            is_a_higher_b=None,

        )


    @staticmethod
    def generate_players_career_cat(cat: str, seen_players: list[int], session) -> tuple[Player, Player, bool]:     
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
        
        # return 2 random players if no seen players, AKA new game
        if not seen_players:
            player_a, player_b = random.sample(available_players, 2)
        else:
            available_players = [p for p in available_players if p.id not in seen_players]
            if not available_players:
                raise HTTPException(status_code=409, detail="No more players available")

            player_a = session.get(Player, seen_players[-1])
            player_b = random.choice(available_players)

        # gets correct answer (if a is higher than b)
        a_higher_b = getattr(player_a, attr_name) >= getattr(player_b, attr_name)
        return (player_a, player_b, a_higher_b)
        

    @staticmethod
    def generate_players_season_cat(cat: str, seen_players: list[int], session) -> tuple[Player, Player, bool]:
        if cat not in SEASON_STAT_CATEGORIES:
            raise HTTPException(status_code=404, detail="Season category type is invalid")

        attr_name = f"season_{cat}"
        cat_col = getattr(PlayerSeason, attr_name)

        # get top 100 players of specified career cat
        available_players = session.exec(
            select(Player)
            .join(PlayerSeason, PlayerSeason.player_id == Player.id)
            .order_by(cat_col.desc())
            .limit(50)
        ).all()

        # return 2 random players if no seen players, AKA new game
        if not seen_players:
            player_a, player_b = random.sample(available_players, 2)
        else:
            available_players = [p for p in available_players if p.id not in seen_players]
            if not available_players:
                raise HTTPException(status_code=409, detail="No more players available")

            player_a = session.get(Player, seen_players[-1])
            player_b = random.choice(available_players)

        player_season_a = session.exec(
            select(PlayerSeason)
            .where(PlayerSeason.player_id == player_a.id, PlayerSeason.season_id.in_(season_ids))
        ).first()

        player_season_b = session.exec(
            select(PlayerSeason)
            .where(PlayerSeason.player_id == player_b.id, PlayerSeason.season_id.in_(season_ids))
        ).first()

        a_higher_b = getattr(player_season_a, attr_name) >= getattr(player_season_b, attr_name)
        return (player_a, player_b, a_higher_b)


