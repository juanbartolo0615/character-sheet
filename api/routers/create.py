from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Character

class CharachterIn(BaseModel):
    user_id: int
    race_id: int
    subrace_id: int | None
    class_id: int
    name: str
    background: int
    strength: int
    dexterity: int
    consitution: int
    intelligence: int
    wisdom: int
    charisma: int
    hitpoints: int



router = APIRouter(prefix="/create", tags=["create"])

@router.post("/")
def create_monk(character: CharachterIn):

    hitpoints = 12
    try:
        create_character_request = Character(
            user_id=character.user_id,
            race_id=character.race_id,
            subrace_id=character.subrace_id,
            class_id=character.class_id,
            name=character.name,
            strength=character.strength,
            dexterity=character.dexterity,
            constitution=character.consitution,
            intelligence=character.intelligence,
            wisdom=character.wisdom,
            charisma=character.charisma


        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create Monk")
