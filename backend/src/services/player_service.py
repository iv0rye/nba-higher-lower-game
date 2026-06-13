from typing import Any

from sqlmodel import select
from src.models import Player


class PlayerService:
    @staticmethod
    def get_players(q):
        return q
