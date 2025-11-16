# 🟪 6. action_plans
# Purpose: Negotiator produces the “Fix this” plan for the user.

from sqlalchemy import Column, String, Numeric, TIMESTAMP, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid

from .base import Base

class ActionPlan(Base):
    __tablename__ = "action_plans"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    insight_id = Column(UUID(as_uuid=True), nullable=False)

    steps = Column(JSON, nullable=False)
    estimated_savings = Column(Numeric)
    status = Column(String, default="pending")

    created_at = Column(TIMESTAMP(timezone=True))



