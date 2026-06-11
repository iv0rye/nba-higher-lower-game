from typing import Any

from sqlmodel import Session, create_engine, SQLModel
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)

def get_db() -> Any:
    with Session(engine) as session:
        yield session
