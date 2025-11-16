from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class Insight(BaseModel):
    id: UUID
    user_id: UUID
    type: str
    title: str
    description: str
    severity: int
    related_transaction_ids: Optional[List[UUID]] = None
    created_at: Optional[datetime] = None


class InsightCreate(BaseModel):
    user_id: UUID
    type: str
    title: str
    description: str
    severity: int = 1
    related_transaction_ids: Optional[List[UUID]] = None
