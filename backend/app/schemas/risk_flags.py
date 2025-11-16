from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, Any

class RiskFlag(BaseModel):
    id: UUID
    user_id: UUID
    flag_type: str
    details: Optional[Any] = None
    resolved: bool = False
    created_at: Optional[datetime] = None


class RiskFlagCreate(BaseModel):
    user_id: UUID
    flag_type: str
    details: Optional[Any] = None
