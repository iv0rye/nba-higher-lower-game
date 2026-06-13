from enum import Enum
from sqlmodel import Session
from src.models.season import Season
from src.database import engine

class Range(Enum):
    MIN = 0
    MAX = 1

# TODO: seeder currently does not handle formatting of seasons in 19xx.
# this should be fixed if moving to all time player model!
class SeasonSeeder:
    def __init__(self, year_range: tuple[int] = (2000, 2027), engine = engine):
        self.session = Session(engine)
        self.year_range = year_range

    @staticmethod
    def season_start_yr(season_str: str) -> int:
        """ 
        gets first four characters of season string, which should be structured as for example: "2001-02" 
        """
        return int(season_str[0:4])
    
    @staticmethod
    def season_end_yr(season_str: str) -> int:
        """ 
        gets last 2 characters of season string and appending with decade, 
        which should be structured as for example: "2001-02" 
        """
        return int(f"20{season_str[5:7]}")
    
    def season_label(self, year: int) -> str:
        """
        converts year number into a label for season in format "20xx-xy"
        """
        return f"{year}-{str(year + 1)[2:4]}"
    
    def generate(self) -> None:
        year = self.year_range[Range.MIN]

        with self.session:
            for yr in range(year, self.year_range[Range.MAX]):
                try:
                    label = self.season_label(yr)
                    start_year = self.season_start_yr(label)
                    end_year = self.season_end_yr(label)

                    season = Season(
                        label=label,
                        year_start=start_year,
                        year_end=end_year
                    )

                    self.session.add(season)

                    
                except Exception as e:
                    print(f"Failed: {e}")
                    self.session.rollback()

            self.session.commit()



