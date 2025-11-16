from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.users_service import get_user, create_user
from app.schemas.users import User, UserCreate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}", response_model=User)
def read_user(user_id: UUID):
    try:
        return get_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=User)
def new_user(payload: UserCreate):
    try:
        return create_user(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
