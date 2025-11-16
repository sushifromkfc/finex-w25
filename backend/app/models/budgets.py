# 🟩 3. budgets
# Purpose: User-defined spending limits per category.

from sqlalchemy import Column, String, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid

from .base import Base

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)

    category = Column(String, nullable=False)
    monthly_limit = Column(Numeric, nullable=False)

    created_at = Column(TIMESTAMP(timezone=True))


