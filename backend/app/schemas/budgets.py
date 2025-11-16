from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class Budget(BaseModel):
    id: UUID
    user_id: UUID
    category: str
    monthly_limit: float
    created_at: Optional[datetime] = None


class BudgetCreate(BaseModel):
    user_id: UUID
    category: str
    monthly_limit: float
