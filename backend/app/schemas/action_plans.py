from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Any, Optional, List

class ActionPlan(BaseModel):
    id: UUID
    user_id: UUID
    insight_id: UUID
    steps: Any           # list of steps or structured JSON
    estimated_savings: Optional[float] = None
    status: Optional[str] = "pending"
    created_at: Optional[datetime] = None


class ActionPlanCreate(BaseModel):
    user_id: UUID
    insight_id: UUID
    steps: Any
    estimated_savings: Optional[float] = None
    status: Optional[str] = "pending"
