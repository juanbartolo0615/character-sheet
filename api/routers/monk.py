from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Character

class MonkIn(BaseModel):
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



router = APIRouter(prefix="/Monk", tags=["create"])

@router.post("/")
def create_monk(monk: MonkIn):
    try:
        create_monk_request = Character(
            user_id=monk.user_id,
            race_id=monk.race_id,
            subrace_id=monk.subrace_id,
            class_id=monk.class_id,
            name=monk.name,

        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create Monk")
