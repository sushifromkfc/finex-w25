from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.agent_logs_service import (
    get_agent_logs,
    create_agent_log,
)
from app.schemas.agent_logs import AgentLog, AgentLogCreate

router = APIRouter(prefix="/agent-logs", tags=["agent_logs"])


@router.get("/", response_model=List[AgentLog])
def read_agent_logs(user_id: UUID):
    try:
        return get_agent_logs(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=AgentLog)
def new_agent_log(payload: AgentLogCreate):
    try:
        return create_agent_log(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
