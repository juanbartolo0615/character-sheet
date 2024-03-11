from fastapi import FastAPI
from routers import auth, races
import json
from contextlib import asynccontextmanager
from database import SessionLocal
from sqlalchemy import select
from model import Races, RacialTraits, Subraces, SubracesTraits


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

        subraces = conn.execute(select(Subraces)).first()
        if not subraces:
            f = open("db_injection/subRaces.json")
            data = json.load(f)
            for subrace in data["subraces"]:
                race_id = conn.execute(select(Races.id).where(Races.name == subrace["race"])).scalar_one()
                create_subrace_request= Subraces(
                    race_id=race_id,
                    name=subrace["subrace"]
                )
                conn.add(create_subrace_request)
            f.close()
            conn.commit()

        subraces_traits = conn.execute(select(SubracesTraits)).first()
        if not subraces_traits:
            f = open("db_injection/subRace_traits.json")
            data = json.load(f)
            for subrace in data["subrace_traits"]:
                subrace_id = conn.execute(select(Subraces.id).where(Subraces.name == subrace["subrace"])).scalar_one()
                for trait in subrace["traits"]:
                    create_subrace_traits = SubracesTraits(
                        subrace_id=subrace_id,
                        trait=trait,
                        description=subrace["traits"][trait]
                    )
                    conn.add(create_subrace_traits)
                f.close()
                conn.commit()

    yield
    print("Restarting")


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
app.include_router(races.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
