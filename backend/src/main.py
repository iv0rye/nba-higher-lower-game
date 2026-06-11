from fastapi import FastAPI
from .database import create_db_and_tables
from . import models   # for initialising database

# create dbs on start
create_db_and_tables()

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
