from fastapi import FastAPI
from sqlmodel import select
from .routers import games, players, seasons
from .dependencies import SessionDep
from .database import create_db_and_tables, get_session, engine
from . import models   # for initialising database
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# create dbs on start
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(games.router)
app.include_router(players.router)
app.include_router(seasons.router)

@app.get("/")
async def root():
    return {"message": "Backend/API is working!"}
