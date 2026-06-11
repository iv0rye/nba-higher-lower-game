
class PlayerService:
    @staticmethod
    def get_players(session, limit: int = 50):
        return session.exec(
            select(Player)
            .order_by(Player.career_ppg.desc())
            .limit(limit)
        ).all()
