from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class User(BaseModel):
    id: UUID
    email: str | None = None
    full_name: str | None = None
    created_at: datetime | None = None


class UserCreate(BaseModel):
    email: str
    full_name: str | None = None
