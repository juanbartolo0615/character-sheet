from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from database import SessionLocal
from model import User
from sqlalchemy import select


router = APIRouter(prefix="/auth", tags=["auth"])

SECRET_KEY = "bf214192ab65282b11a2fa4ba4131a7c24346df55c72e00fa3addcc131c7c773"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 240

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(create_user_request: CreateUserRequest):
    create_user_model = User(
        username=create_user_request.username,
        hashed_password=pwd_context.hash(create_user_request.password))

    with SessionLocal() as conn:
        stmt = select(User).where(User.username == create_user_request.username)
        result = conn.execute(stmt)
        print(result)
        print("^^^^^^^^^^")
        if not result:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Username is already in use")

        conn.add(create_user_model)
        conn.commit()

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    token = create_access_token(user.username, user.id, timedelta(minutes=240))
    return {"access_token": token, "token_type": "bearer"}

def authenticate_user(username: str, password: str):
    with SessionLocal() as conn:
        stmt = select(User).where(User.username == username)
        user = conn.execute(stmt).scalar_one()
        if not user:
            return False
        if not pwd_context.verify(password, user.hashed_password):
            return False
        return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {"sub": username, "id": user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")

user_dependency = Annotated[dict, Depends(get_current_user)]
