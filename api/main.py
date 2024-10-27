from fastapi import FastAPI
from routers import auth, races, character, classes, subclasses, backgrounds
import json
from contextlib import asynccontextmanager
from database import SessionLocal
from sqlalchemy import select
from model import Races, RacialTraits, Subraces, SubracesTraits, Classes, Subclass, ClassFeature, SubclassFeature, Background, ArtisanTools
from fastapi.middleware.cors import CORSMiddleware


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

        classes = conn.execute(select(Classes)).first()
        if not classes:
            f = open("db_injection/classes.json")
            data = json.load(f)
            for classs in data["classes"]:
                create_class_request = Classes(
                    name=classs["class"],
                    description=classs["description"]
                )
                conn.add(create_class_request)
            f.close()
            conn.commit()

        subclass = conn.execute(select(Subclass)).first()
        if not subclass:
            f = open("db_injection/subclass.json")
            data = json.load(f)
            for subclass in data["subclass"]:
                class_id = conn.execute(select(Classes.id).where(Classes.name == subclass["class"])).scalar_one()
                create_subclass_request = Subclass(
                    class_id=class_id,
                    subclass_name=subclass["subclass"],
                    description=subclass["description"]
                )
                conn.add(create_subclass_request)
            f.close()
            conn.commit()

        feature = conn.execute(select(ClassFeature)).first()
        if not feature:
            f = open("db_injection/class_features.json")
            data = json.load(f)
            for feature in data["features"]:
                class_id = conn.execute(select(Classes.id).where(Classes.name == feature["class"])).scalar_one()
                create_feature_request = ClassFeature(
                    class_id=class_id,
                    level=feature["level"],
                    feature=feature["feature"],
                    description=feature["description"]
                )
                conn.add(create_feature_request)
            f.close()
            conn.commit()

        subclass_feature = conn.execute(select(SubclassFeature)).first()
        if not subclass_feature:
            f = open("db_injection/subclass_features.json")
            data = json.load(f)
            for feature in data["features"]:
                class_id = conn.execute(select(Classes.id).where(Classes.name == feature["class"])).scalar_one()
                subclass_id = conn.execute(select(Subclass.id).where(Subclass.subclass_name == feature["subclass"])).scalar_one()
                create_subclass_feature_request = SubclassFeature(
                    class_id=class_id,
                    subclass_id=subclass_id,
                    level=feature["level"],
                    feature=feature["feature"],
                    description=feature["description"]
                )
                conn.add(create_subclass_feature_request)
            f.close()
            conn.commit()

        backgrounds = conn.execute(select(Background)).first()
        if not backgrounds:
            f = open("db_injection/background.json")
            data = json.load(f)
            for background in data["backgrounds"]:
                create_background_request = Background(
                    name=background["name"],
                    description=background["description"],
                    feature=background["feature"],
                    feature_description=background["feature_description"],
                    proficiencies=background["proficiencies"],
                    languages=background["languages"]
                )
                conn.add(create_background_request)
            f.close()
            conn.commit()

        artisan_tools = conn.execute(select(ArtisanTools)).first()
        if not artisan_tools:
            f = open("db_injection/artisan_tools.json")
            data = json.load(f)
            for artisan_tool in data["artisans_tools"]:
                create_artisan_tool_request = ArtisanTools(
                    name=artisan_tool["name"],
                    description=artisan_tool["description"],
                    use=artisan_tool["use"]
                )
                conn.add(create_artisan_tool_request)
            f.close()
            conn.commit()


    yield
    print("Restarting")


app = FastAPI(lifespan=lifespan)


app.include_router(auth.router)
app.include_router(races.router)
app.include_router(character.router)
app.include_router(classes.router)
app.include_router(subclasses.router)
app.include_router(backgrounds.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
