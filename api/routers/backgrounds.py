from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Background

class BackgroundOut(BaseModel):
    id: int
    name: str
    description: str
    feature: str
    feature_description: str
    proficiencies: str
    languages: int

router = APIRouter(prefix="/backgrounds", tags=["backgrounds"])

@router.get("/", response_model=List[BackgroundOut])
def get_all_backgrounds():
    try:
        with SessionLocal() as conn:
            backgrounds = conn.execute(select(Background))
            result = []
            for background in backgrounds.scalars():
                result.append(BackgroundOut(
                    id=background.id,
                    name=background.name,
                    description=background.description,
                    feature=background.feature,
                    feature_description=background.feature_description,
                    proficiencies=background.proficiencies,
                    languages=background.languages
                ))
            return result
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve Background")

@router.get("/{background_id}", response_model=BackgroundOut)
def get_one_background(background_id: int):
    try:
        with SessionLocal() as conn:
            backgrounds = conn.execute(select(Background).where(Background.id == background_id))
            for background in backgrounds.scalars():
                return BackgroundOut(
                        id=background.id,
                        name=background.name,
                        description=background.description,
                        feature=background.feature,
                        feature_description=background.feature_description,
                        proficiencies=background.proficiencies,
                        languages=background.languages
                    )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve Background")
