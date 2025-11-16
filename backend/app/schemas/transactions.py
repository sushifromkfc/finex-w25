from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional, Any, Union

class Transaction(BaseModel):
    id: Union[UUID, str, int]
    user_id: UUID
    date: date
    name: str
    amount: float
    category: Optional[str] = None
    is_subscription: Optional[bool] = False
    source: Optional[str] = None
    raw_json: Optional[Any] = None
    created_at: Optional[datetime] = None


class TransactionCreate(BaseModel):
    user_id: UUID
    date: date
    name: str
    amount: float
    category: Optional[str] = None
    is_subscription: Optional[bool] = False
    source: Optional[str] = None
    raw_json: Optional[Any] = None
