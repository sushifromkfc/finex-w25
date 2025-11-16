# 🟧 2. transactions
# Purpose: Stores all synced transactions — from mock or Plaid.

from sqlalchemy import Column, String, Numeric, Date, Boolean, TIMESTAMP, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid

from .base import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)

    date = Column(Date, nullable=False)
    name = Column(String, nullable=False)
    amount = Column(Numeric, nullable=False)
    category = Column(String)
    is_subscription = Column(Boolean, default=False)
    source = Column(String, nullable=False)
    raw_json = Column(JSON)

    created_at = Column(TIMESTAMP(timezone=True))
