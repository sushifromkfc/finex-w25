from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, Union

class Budget(BaseModel):
    id: Union[UUID, str, int]
    user_id: UUID
    category: str
    monthly_limit: float
    created_at: Optional[datetime] = None


class BudgetCreate(BaseModel):
    user_id: UUID
    category: str = "Total Budget"
    monthly_limit: float


class BudgetUpdate(BaseModel):
    category: Optional[str] = None
    monthly_limit: Optional[float] = None
