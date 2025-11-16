from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Union

class Insight(BaseModel):
    id: Union[UUID, str, int]
    user_id: UUID
    type: str
    title: str
    description: str
    severity: int
    related_transaction_ids: Optional[List[Union[UUID, str, int]]] = None
    created_at: Optional[datetime] = None


class InsightCreate(BaseModel):
    user_id: UUID
    type: str
    title: str
    description: str
    severity: int = 1
    related_transaction_ids: Optional[List[Union[UUID, str, int]]] = None
