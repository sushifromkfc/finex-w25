from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.insights_service import (
    get_insights,
    create_insight,
)
from app.schemas.insights import Insight, InsightCreate

router = APIRouter(prefix="/insights", tags=["insights"])


@router.get("/", response_model=List[Insight])
def read_insights(user_id: UUID):
    try:
        return get_insights(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=Insight)
def new_insight(payload: InsightCreate):
    try:
        return create_insight(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
