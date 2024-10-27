from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Character
from typing import Optional
from model import Character

class CharacterIn(BaseModel):
    user_id: int
    race_id: int
    subrace_id: Optional[int] = None
    name: str
    class_id: int

class CharactersOut(BaseModel):
    id: int
    user_id: int
    race_id: int
    subrace_id: Optional[int] = None
    class_id: int
    name: str
    level: int


router = APIRouter(prefix="/characters", tags=["characters"])

@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_character(character: CharacterIn):
    if character.subrace_id == 0:
        character.subrace_id = None

    create_character_model = Character(
        user_id=character.user_id,
        race_id=character.race_id,
        subrace_id=character.subrace_id,
        class_id=character.class_id,
        level=1,
        name=character.name
    )
    with SessionLocal() as conn:
        conn.add(create_character_model)
        conn.commit()

@router.get("/{user_id}")
def get_all_characters(user_id: int):
    try:
        with SessionLocal() as conn:
            characters = conn.execute(select(Character).where(Character.user_id == user_id))
            result = []
            for character in characters.scalars():
                result.append(CharactersOut(
                    id=character.id,
                    user_id=character.user_id,
                    race_id=character.race_id,
                    subrace_id=character.subrace_id,
                    class_id=character.class_id,
                    name=character.name,
                    level=character.level
                )
                )
        return result
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve Characters")
