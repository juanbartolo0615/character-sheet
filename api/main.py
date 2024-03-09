from fastapi import FastAPI
from routers import auth
import json
from contextlib import asynccontextmanager
from database import SessionLocal
from sqlalchemy import select
from model import Races
from pydantic import BaseModel

class CreateRaceRequest(BaseModel):
    name: str
    description: str



@asynccontextmanager
async def lifespan(app: FastAPI):
    with SessionLocal() as conn:
        races = conn.execute(select(Races)).first()
        if not races:
            f = open("db_injection/races.json")
            data = json.load(f)
            for race in data["races"]:
                create_race_request = Races(
                    name=race["name"],
                    description=race["description"]
                )
                conn.add(create_race_request)
            conn.commit()
    yield
    print("Shutting down")


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
