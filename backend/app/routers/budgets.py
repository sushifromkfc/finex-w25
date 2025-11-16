from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.budgets_service import (
    get_budgets,
    create_budget,
)
from app.schemas.budgets import Budget, BudgetCreate

router = APIRouter(prefix="/budgets", tags=["budgets"])


@router.get("/", response_model=List[Budget])
def read_budgets(user_id: UUID):
    try:
        return get_budgets(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=Budget)
def new_budget(payload: BudgetCreate):
    try:
        return create_budget(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
