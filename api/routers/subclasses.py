from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Subclass, SubclassFeature
from typing import Optional, List

router = APIRouter(prefix="/subclass", tags=["subclass"])

class SubclassesOut(BaseModel):
    id: int
    class_id: int
    subclass_name: str
    description: str

class SubclassFeaturesOut(BaseModel):
    id: int
    class_id: int
    subclass_id:int
    level: int
    feature: str
    description: str

class SubclassOut(BaseModel):
    id: int
    class_id: int
    subclass_name: str
    description: str
    features: List[SubclassFeaturesOut]

@router.get("/{subclass_id}", response_model=SubclassOut)
def get_one_subclass(subclass_id: int):
    try:
        with SessionLocal() as conn:
            subclasses = conn.execute(select(Subclass).where(Subclass.id == subclass_id))
            features = []
            for subclass in subclasses.scalars():
                subclass_features = conn.execute(select(SubclassFeature).where(SubclassFeature.subclass_id == subclass.id))
                for feature in subclass_features.scalars():
                    features.append(SubclassFeaturesOut(
                        id=feature.id,
                        class_id=feature.class_id,
                        subclass_id=feature.subclass_id,
                        level=feature.level,
                        feature=feature.feature,
                        description=feature.description
                    ))
            return SubclassOut(
                id=subclass.id,
                class_id=subclass.class_id,
                subclass_name=subclass.subclass_name,
                description=subclass.description,
                features=features
            )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve subclasses")

@router.get("/", response_model=List[SubclassesOut])
def get_all_subclasses():
    try:
        with SessionLocal() as conn:
            subclasses = conn.execute(select(Subclass))
            result = []
            for subclass in subclasses.scalars():
                result.append(SubclassesOut(
                    id=subclass.id,
                    class_id=subclass.class_id,
                    subclass_name=subclass.subclass_name,
                    description=subclass.description,
                ))
            return result
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve subclasses")
