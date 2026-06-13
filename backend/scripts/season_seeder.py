from sqlmodel import Session
from src.database import engine


class SeasonSeeder:
    def __init__(self, engine = engine):
        self.session = Session(engine)
        self.year = 2000

    @staticmethod
    def season_start_yr(season_str: str) -> str:
        return season_str[0:4]
    
    @staticmethod
    def season_end_yr(season_str: str) -> str:
        return f"20{season_str[5:7]}"
    
    def season_label(self) -> str:
        res = f"{self.year}-{str(self.year + 1)[2:4]}"
        self.year += 1
        
        return res