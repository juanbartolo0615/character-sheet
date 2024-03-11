from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Races, Subraces, RacialTraits, SubracesTraits

class SubRacesTraitsOut(BaseModel):
    id: int
    subrace_id: int
    trait: str
    description: str

class SubRacesOut(BaseModel):
    id: int
    race_id: int
    name: str
    traits: List[SubRacesTraitsOut]

class RacialTraitsOut(BaseModel):
    id: int
    race_id: int
    trait: str
    description: str

class RaceOut(BaseModel):
    id: int
    name: str
    description: str
    traits: List[RacialTraitsOut]
    subraces: List[SubRacesOut] | None


router = APIRouter(prefix="/races", tags=["races"])


def get_racial_traits(race_id: int):
    with SessionLocal() as conn:
        traits = conn.execute(select(RacialTraits).where(RacialTraits.race_id == race_id))
        racial_traits = []
        for trait in traits.scalars():
            racial_traits.append(RacialTraitsOut(
                id=trait.id,
                race_id=trait.race_id,
                trait=trait.trait,
                description=trait.description
            ))
    return racial_traits

def get_subraces(race_id: int):
    with SessionLocal() as conn:
        subraces = conn.execute(select(Subraces).where(Subraces.race_id == race_id))
        subraces_result = []
        for subrace in subraces.scalars():
            subrace_traits = conn.execute(select(SubracesTraits).where(SubracesTraits.subrace_id == subrace.id))
            subrace_traits_result = []
            for trait in subrace_traits.scalars():
                subrace_traits_result.append(SubRacesTraitsOut(
                    id=trait.id,
                    subrace_id=trait.subrace_id,
                    trait=trait.trait,
                    description=trait.description
                ))
            subraces_result.append(SubRacesOut(
                id=subrace.id,
                race_id=subrace.race_id,
                name=subrace.name,
                traits=subrace_traits_result
            ))
        if not subraces_result:
            return None
        else:
            return subraces_result


@router.get("/", response_model=List[RaceOut])
def get_all_races():
    try:
        with SessionLocal() as conn:
            races = conn.execute(select(Races))
            result = []
            for race in races.scalars():
                racial_traits = get_racial_traits(race.id)
                subraces_result = get_subraces(race.id)

                result.append(RaceOut(
                    id=race.id,
                    name=race.name,
                    description=race.description,
                    traits=racial_traits,
                    subraces=subraces_result
                ))
        return result
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve races")


@router.get("/{race_id}", response_model=RaceOut)
def get_one_race(race_id: int):
    try:
        with SessionLocal() as conn:
            race = conn.execute(select(Races).where(Races.id == race_id)).scalar_one()
            racial_traits = get_racial_traits(race_id)
            subraces_result = get_subraces(race_id)

            return RaceOut(
                    id=race.id,
                    name=race.name,
                    description=race.description,
                    traits=racial_traits,
                    subraces=subraces_result
                )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve race")
