import time

from sqlmodel import Session
from src.models import Player, PlayerSeason
from src.database import engine

from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

class PlayerSeeder:
    def __init__(self, engine = engine):
        self.session = Session(engine)
        self.fail_no = 0

    @staticmethod
    def to_int(value):
        """
        converts numpy values from dataframes into python int for schema
        """
        if value is None:
            return None
        
        return int(value)

    @staticmethod
    def to_float(value):
        """
        converts numpy values from dataframes into python float for schema
        """
        if value is None:
            return None
        
        return float(value)
    
    @staticmethod
    def per_game(total_stat: float, games_played: int) -> float | None:
        """
        Processes per game stats by dividing certain stat value by games played.
        """
        if total_stat <= 0 or games_played <= 0:
            return None
        
        return float(round(total_stat / games_played, 2))
    
    @staticmethod
    def percentage(total_stat_made: float, total_stat: float) -> float | None:
        """
        Processes percentage stats by dividing made by attempts.

        Primarily purposed for career stats as season stats have accessible percentages
        """
        if total_stat <= 0:
            return None

        # api returns values in format eg. %50 as 0.500. this processes that
        return float(round((total_stat_made / total_stat) * 100, 1))


    def get_players(self) -> list[dict]:
        all_players: list[dict] = players.get_active_players()
        print(f"found {len(all_players)}")

        return all_players
    

    def seed_player(self, p: dict, df) -> Player:
        total_gp = int(df["GP"].sum())

        pts = df["PTS"].sum()
        ast = df["AST"].sum()
        reb = df["REB"].sum()
        stl = df["STL"].sum()
        blk = df["BLK"].sum()

        fgm = df["FGM"].sum()
        fga = df["FGA"].sum()
        fg3m = df["FG3M"].sum()
        fg3a = df["FG3A"].sum()
        ftm = df["FTM"].sum()
        fta = df["FTA"].sum()

        player = Player(
            nba_id=p["id"],
            name=p["full_name"],
            position=p.get("position"),
            is_active=p["is_active"],
            # gets player photo with player id on CDN link
            photo_url=f"https://cdn.nba.com/headshots/nba/latest/1040x760/{p['id']}.png",

            total_games_played=total_gp,
            seasons_played=len(df),

            career_pts=self.to_int(pts),
            career_ast=self.to_int(ast),
            career_reb=self.to_int(reb),
            career_stl=self.to_int(stl),
            career_blk=self.to_int(blk),

            career_three_pm=self.to_int(fg3m),
            career_fgm=self.to_int(fgm),
            career_ftm=self.to_int(ftm),

            career_ppg=self.per_game(pts, total_gp),
            career_apg=self.per_game(ast, total_gp),
            career_rpg=self.per_game(reb, total_gp),
            career_spg=self.per_game(stl, total_gp),
            career_bpg=self.per_game(blk, total_gp),

            career_fg_percentage=self.percentage(fgm, fga),
            career_three_percentage=self.percentage(fg3m, fg3a),
            career_ft_percentage=self.percentage(ftm, fta),
        )

        self.session.add(player)
        self.session.flush()

        return player
    
    
    def seed_player_seasons(self, player: Player, df):
        """
        Seeds PlayerSeason table for every season of player where games played is above 20
        """
        for _, row in df.iterrows():

            season_gp = row["GP"]

            if season_gp <= 20:
                continue

            season = PlayerSeason(
                player_id=player.id,

                season=row["SEASON_ID"],
                team=row["TEAM_ABBREVIATION"],

                games_played=int(season_gp),

                season_ppg=self.per_game(row["PTS"], season_gp),
                season_apg=self.per_game(row["AST"], season_gp),
                season_rpg=self.per_game(row["REB"], season_gp),
                season_spg=self.per_game(row["STL"], season_gp),
                season_bpg=self.per_game(row["BLK"], season_gp),
                season_three_pm=self.per_game(row["FG3M"], season_gp),

                season_fg_percentage=round(row["FG_PCT"] * 100, 1) if row["FG_PCT"] > 0 else None,
                season_three_percentage=round(row["FG3_PCT"] * 100, 1) if row["FG3_PCT"] > 0 else None,
                season_ft_percentage=round(row["FT_PCT"] * 100, 1) if row["FT_PCT"] > 0 else None,
            )

            self.session.add(season)


    def generate(self):
        all_players = self.get_players()

        with self.session:
            for p in all_players:

                print(f"Seeding {p['full_name']}")

                try:
                    career = playercareerstats.PlayerCareerStats(player_id=p["id"])
                    df = career.season_totals_regular_season.get_data_frame()
                    
                    # if total games played of a player is less than 50, do not add to database
                    if df.empty or int(df["GP"].sum()) < 50:
                        continue 

                    player = self.seed_player(p, df)

                    self.seed_player_seasons(player, df)

                    self.session.commit()

                except Exception as e:
                    print(f"Failed: {e}")
                    self.session.rollback()
                    self.fail_no += 1
                    continue

                time.sleep(0.6)


seed = PlayerSeeder()

seed.generate()