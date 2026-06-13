from fastapi import FastAPI
from sqlmodel import select
from .routers import games, players, seasons
from .dependencies import SessionDep
from .database import create_db_and_tables, get_session, engine
from . import models   # for initialising database
from contextlib import asynccontextmanager

# create dbs on start
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    engine.dispose()


app = FastAPI(lifespan=lifespan)

app.include_router(games.router)
app.include_router(players.router)
app.include_router(seasons.router)

# @app.get("/")
# async def root(session: SessionDep):
#     res = session.exec(
#         select(models.PlayerSeason, models.Player)
#         .join(models.Player, models.PlayerSeason.player_id == models.Player.id)
#         .where(models.PlayerSeason.season == '2010-11')
#     ).all() 

#     return [
#     {
#         "season": season,
#         "player": player,
#     } for season, player in res
#     ]
