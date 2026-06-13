from sqlmodel import Session
from src.models.season import Season
from src.database import engine


class SeasonSeeder:
    def __init__(self, year_range: tuple[int] = (2000, 2027), engine = engine):
        self.session = Session(engine)
        self.year_range = year_range

    @staticmethod
    def season_start_yr(season_str: str) -> int:
        return int(season_str[0:4])
    
    @staticmethod
    def season_end_yr(season_str: str) -> int:
        return int(f"20{season_str[5:7]}")
    
    def season_label(self, year: int) -> str:
        """
        converts year number into a label for season in format "20xx-xy"
        """
        return f"{year}-{str(year + 1)[2:4]}"
    
    def generate(self) -> None:
        year = self.year_range[0]

        with self.session:
            for yr in range(year, self.year_range[1]):
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



