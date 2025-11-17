from fastapi import APIRouter, HTTPException
from uuid import UUID

from app.agents.pipeline import run_pipeline
from app.agents.strategist import StrategistAgent

router = APIRouter(tags=["agent"])


@router.post("/run/{user_id}")
def run_agent_pipeline(user_id: UUID):
    try:
        return run_pipeline(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/weekly/{user_id}")
def run_weekly_advice(user_id: UUID):
    try:
        return StrategistAgent.run_weekly(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
