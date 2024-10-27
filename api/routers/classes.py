from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from sqlalchemy import select
from model import Classes, ClassFeature
from typing import Optional, List
from model import Character

router = APIRouter(prefix="/class", tags=["class"])

class ClassFeaturesOut(BaseModel):
    id: int
    class_id: int
    level: int
    feature: str
    description: str

class ClassOut(BaseModel):
    id: int
    name: str
    description: str
    features: List[ClassFeaturesOut]


@router.get("/", response_model=List[ClassOut])
def get_all_classes():
    try:
        with SessionLocal() as conn:
            classes = conn.execute(select(Classes))
            result = []
            for classs in classes.scalars():
                class_features = conn.execute(select(ClassFeature).where(ClassFeature.class_id == classs.id))
                features = []
                for feature in class_features.scalars():
                    features.append(ClassFeaturesOut(
                        id=feature.id,
                        class_id=feature.class_id,
                        level=feature.level,
                        feature=feature.feature,
                        description=feature.description
                    ))
                result.append(ClassOut(
                    id=classs.id,
                    name=classs.name,
                    description=classs.description,
                    features=features
                ))
            return result
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve classes")

@router.get("/{class_id}", response_model=ClassOut)
def get_one_class(class_id: int):
    try:
        with SessionLocal() as conn:
            classes = conn.execute(select(Classes).where(Classes.id == class_id))
            for classs in classes.scalars():
                class_features = conn.execute(select(ClassFeature).where(ClassFeature.class_id == classs.id))
                features = []
                for feature in class_features.scalars():
                    features.append(ClassFeaturesOut(
                        id=feature.id,
                        class_id=feature.class_id,
                        level=feature.level,
                        feature=feature.feature,
                        description=feature.description
                    ))
                return ClassOut(
                        id=classs.id,
                        name=classs.name,
                        description=classs.description,
                        features=features
                    )
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not retrieve Class details")
