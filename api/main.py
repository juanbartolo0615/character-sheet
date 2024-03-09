from fastapi import FastAPI
from routers import auth
import json
from contextlib import asynccontextmanager
from database import SessionLocal
from sqlalchemy import select
from model import Races, RacialTraits


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
            f.close()
            conn.commit()

        racial_traits = conn.execute(select(RacialTraits)).first()
        if not racial_traits:
            f = open("db_injection/racial_traits.json")
            data = json.load(f)
            for trait in data["racialTraits"]:
                race_id = conn.execute(select(Races.id).where(Races.name == trait["name"])).scalar_one()
                for racial_trait in trait["traits"]:
                    create_racial_trait_request = RacialTraits(
                        race_id=race_id,
                        trait=racial_trait,
                        description=trait["traits"][racial_trait]
                    )
                    conn.add(create_racial_trait_request)
            f.close()
            conn.commit()
    yield
    print("Restarting")


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
