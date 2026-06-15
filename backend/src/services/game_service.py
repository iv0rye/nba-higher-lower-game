import random

from fastapi import HTTPException
from sqlmodel import Session, select
from src.models.player import CAREER_STAT_CATEGORIES
from src.models.player_season import SEASON_STAT_CATEGORIES
from src.models import GameSession, Season, Game, Player, PlayerSeason
from src.schemas import GetGameSessionResponse, GuessRequest, GuessResponse, PlayerStatRead, StartGameRequest, NewGameResponse


class GameService:
    CURRENT_SEASON = '2025-26'

    @staticmethod
    def start_game(cat: str, stat_type: str, body: StartGameRequest, session) -> NewGameResponse:
        """
        TODO: rate limit start game

        Starts a game. Function inits a GameSession row, adds it, and then runs generate new game round to generate initial game round.
        Also runs get_player_stat to get the generated player stats in the response format.

        Args:
            cat: string containing category of game (eg. ppg (points per game))
            stat_type: string containing type of game (in set {career, season})
            body: body for request of starting game. as of now only contains seasons
            session: database session

        Return:
            returns the first game round of the new game session
        """
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
        
        new_game = GameService.generate_new_game_round(new_game_session.session_token, session)
    
        player_a_stat = GameService.get_player_stat(new_game, new_game_session, session, 'a')
        player_b_stat = GameService.get_player_stat(new_game, new_game_session, session, 'b')

        return NewGameResponse(
            session_token=new_game_session.session_token,
            game_id=new_game.id,
            stat_category=new_game_session.stat_category,
            stat_type=new_game_session.stat_type,
            player_a=player_a_stat,
            player_b=player_b_stat
        )
    
    @staticmethod
    def game_guess(req: GuessRequest, session) -> GuessResponse:
        """
        Function that runs when guessing a game round. Gets current game session and round
        and calculates if the guess is correct. If it is, generates new round, if not, does not.

        Args:
            req: GameRequest containing session_id, game_id, and a bool representing the guess (is_a_over_b)
            session: database session

        Return:
            Returns GuessResponse, data model containing if guess is correct, accumalative score so far,
            if the session is still active (false if guess is wrong), player_b of current rounds stat read, and
            the next game round (if guess is correct)
        """
        cur_session = GameService.get_curr_session(req.session_token, session)
        cur_game = session.exec(
            select(Game)
            .where(Game.id == req.game_id)
        ).one_or_none()

        if not cur_game:
            raise HTTPException(status_code=404, detail="Game round not found")

        if cur_game.session_id != cur_session.id:
            raise HTTPException(status_code=404, detail="Game round does not belong to this session")
        
        if cur_game.is_correct is not None:
            raise HTTPException(status_code=409, detail="This round has already been answered")
        
        if cur_session.is_active is False:
            raise HTTPException(status_code=409, detail="This game session has already ended")

        cur_player_a_stat: PlayerStatRead = GameService.get_player_stat(cur_game, cur_session, session, 'a')
        cur_player_b_stat: PlayerStatRead = GameService.get_player_stat(cur_game, cur_session, session, 'b')

        correct_guess = ((req.is_a_over_b and cur_player_a_stat.stat_value >= cur_player_b_stat.stat_value)
            or (not req.is_a_over_b and cur_player_a_stat.stat_value <= cur_player_b_stat.stat_value))
        
        if correct_guess: 
            # update cur game and session to reflect correct guess
            cur_game.guess_a_higher_b = req.is_a_over_b
            cur_game.is_correct = True

            cur_session.score += 1

            session.add(cur_session)
            session.add(cur_game)
            session.commit()

            # new_game_round is of Game, new_game_round_res is what is being responded to call
            new_game_round: Game = GameService.generate_new_game_round(req.session_token, session, cur_game.player_b)

            player_a_stat: PlayerStatRead = cur_player_b_stat
            player_b_stat: PlayerStatRead = GameService.get_player_stat(new_game_round, cur_session, session, 'b')

            new_game_round_res = NewGameResponse(
                session_token=cur_session.session_token,
                game_id=new_game_round.id,
                stat_category=cur_session.stat_category,
                stat_type=cur_session.stat_type,
                player_a=player_a_stat,
                player_b=player_b_stat
            )

            return GuessResponse(
                is_correct=True,
                score=cur_session.score,
                session_active=True,
                player_b=cur_player_b_stat,
                next_round=new_game_round_res
            )
        
        # update cur game and session to reflect incorrect guess
        cur_game.guess_a_higher_b = req.is_a_over_b
        cur_game.is_correct = False

        cur_session.is_active = False

        session.add(cur_session)
        session.add(cur_game)
        session.commit()

        return GuessResponse(
            is_correct=False,
            score=cur_session.score,
            session_active=False,
            player_b=cur_player_b_stat,
            next_round=None
        )
    

    @staticmethod
    def get_game(session_token: str, session):
        """
        Function that gets game session and all games under game session from token. If
        game session is not over yet, raises error.
        
        Args:
            session_token: token for a game session
            session: database session
        """
        game_session = GameService.get_curr_session(session_token, session)
        return game_session

    
    @staticmethod
    def generate_new_game_round(session_token: str, session, prev_player: Player | None = None) -> Game:
        """
        Generates a new game round. Primarily uses helper functions to generate players,
        and puts the generated players together into a new Game model.

        Args:
            session_token: string representing token of current session
            session: database session
            prev_player: previous player of the last round that carries over to this round. Nullable

        Return:
            Game model containing new game information
        """
        cur_session = GameService.get_curr_session(session_token, session)
        
        # find seen players to filter out of new player list
        seen_players = []
        for game_round in cur_session.rounds:
            seen_players.append(game_round.player_a_id)
            seen_players.append(game_round.player_b_id)

        # initialised only if game is in season type/mode
        player_season_a = None
        player_season_b = None

        # find new players
        if cur_session.stat_type.lower() == "career":
            player_a, player_b = GameService.generate_players_career(
                cur_session.stat_category, 
                seen_players,
                prev_player,
                session
            )

        elif cur_session.stat_type.lower() == "season":
            # find player season of last round to bring to this round
            prev_player_season_b = None
            prev_player_b = None

            if cur_session.rounds:
                last_round = cur_session.rounds[-1]
                prev_player_season_b = last_round.player_season_b
                prev_player_b = last_round.player_b

            player_a, player_b, player_season_a, player_season_b = GameService.generate_players_season(
                cur_session.stat_category, 
                seen_players,
                cur_session.seasons,
                session,
                prev_player_b,
                prev_player_season_b
            )

        else:
            raise HTTPException(status_code=404, detail=f"Game session entry {cur_session.id} has invalid stat type")
        
        new_game = Game(
            guess_a_higher_b=None,
            is_correct=None,
            session_id=cur_session.id,
            player_a_id=player_a.id,
            player_b_id=player_b.id,
            player_season_a_id=player_season_a.id if player_season_a else None,
            player_season_b_id=player_season_b.id if player_season_b else None
        )

        session.add(new_game)
        session.commit()
        session.refresh(new_game)

        return new_game


    @staticmethod
    def generate_players_career(cat: str, seen_players: list[int], prev_player: Player | None, session) -> tuple[Player, Player]: 
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
        
        return GameService.select_players(available_players, seen_players, prev_player, session)
        

    @staticmethod
    def generate_players_season(cat: str, seen_players: list[int], seasons: list[Season], session, prev_player_b: Player | None = None, prev_player_season_b: PlayerSeason | None = None) -> tuple[Player, Player]:
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

        player_a, player_b = GameService.select_players(available_players, seen_players, prev_player_b, session)

        if prev_player_season_b is not None:
            # carry over player_a's season from previous round's player_b
            player_season_a = prev_player_season_b
        else:
            player_season_a = session.exec(
                select(PlayerSeason)
                .where(PlayerSeason.player_id == player_a.id, PlayerSeason.season_id == season.id)
            ).first()

        player_season_b = session.exec(
            select(PlayerSeason)
            .where(PlayerSeason.player_id == player_b.id, PlayerSeason.season_id == season.id)
        ).first()

        if not player_season_a or not player_season_b:
            raise HTTPException(status_code=409, detail="Player missing stats for selected season")

        return (player_a, player_b, player_season_a, player_season_b)


    @staticmethod
    def select_players(available_players: list[Player], seen_players: list[int], prev_player: Player, session) -> tuple[Player, Player]:
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

        if not prev_player:
            player_a = session.get(Player, seen_players[-1])
        else:
            player_a = prev_player

        player_b = random.choice(available_players)

        return (player_a, player_b)
    
    @staticmethod
    def get_player_stat(new_game: Game, cur_session: GameSession, session, player: str = 'a') -> PlayerStatRead:
        """
        helper function to find a players relevant stats to return rather than
        returning every single stat and finding it in the front end
        """
        player_id = getattr(new_game, f"player_{player}_id")
        player_row = session.get(Player, player_id)

        team = None
        season = None

        if cur_session.stat_type.lower() == "career":
            attr_name = f"career_{cur_session.stat_category}"
            stat_value = getattr(player_row, attr_name)
        else:  # "season"
            player_season_id = getattr(new_game, f"player_season_{player}_id")
            player_season = session.get(PlayerSeason, player_season_id)

            attr_name = f"season_{cur_session.stat_category}"
            stat_value = getattr(player_season, attr_name)

            team = player_season.team
            season = player_season.season.label

        return PlayerStatRead(
            id=player_row.id,
            name=player_row.name,
            photo_url=player_row.photo_url,
            team=team,
            season=season,
            stat_category=cur_session.stat_category,
            stat_value=stat_value
        )
    
    @staticmethod
    def get_curr_session(session_token: str, session) -> GameSession:
        """
        helper function to return current session from session token.

        Raises 404 if session token not ofund
        """
        cur_session = session.exec(
            select(GameSession)
            .where(GameSession.session_token == session_token)
        ).one_or_none()

        if not cur_session:
            raise HTTPException(status_code=404, detail="Session token invalid")
        
        return cur_session