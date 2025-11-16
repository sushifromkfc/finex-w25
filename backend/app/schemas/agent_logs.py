from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, Any

class AgentLog(BaseModel):
    id: UUID
    user_id: UUID
    agent: str                 # "Auditor", "Strategist", "Negotiator"
    input_data: Optional[Any] = None
    output_data: Optional[Any] = None
    created_at: Optional[datetime] = None


class AgentLogCreate(BaseModel):
    user_id: UUID
    agent: str
    input_data: Optional[Any] = None
    output_data: Optional[Any] = None
