from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.action_plans_service import (
    get_action_plans,
    create_action_plan,
)
from app.schemas.action_plans import ActionPlan, ActionPlanCreate

router = APIRouter(prefix="/action-plans", tags=["action_plans"])


@router.get("/", response_model=List[ActionPlan])
def read_action_plans(user_id: UUID):
    try:
        return get_action_plans(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=ActionPlan)
def new_action_plan(payload: ActionPlanCreate):
    try:
        return create_action_plan(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
