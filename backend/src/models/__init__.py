from .season import Season, SeasonRead
from .player import Player, PlayerRead
from .player_season import PlayerSeason, PlayerSeasonRead, SeasonPlayerRead
from .game import Game, GameSession

SeasonRead.model_rebuild()
PlayerRead.model_rebuild()
PlayerSeasonRead.model_rebuild()
SeasonPlayerRead.model_rebuild()