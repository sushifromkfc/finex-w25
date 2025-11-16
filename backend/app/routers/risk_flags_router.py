from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from app.services.risk_flags_service import (
    get_risk_flags,
    create_risk_flag,
)
from app.schemas.risk_flags import RiskFlag, RiskFlagCreate

router = APIRouter(prefix="/risk-flags", tags=["risk_flags"])


@router.get("/", response_model=List[RiskFlag])
def read_risk_flags(user_id: UUID):
    try:
        return get_risk_flags(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=RiskFlag)
def new_risk_flag(payload: RiskFlagCreate):
    try:
        return create_risk_flag(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
