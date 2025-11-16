# 🟦 7. agent_logs
# Purpose: Full trace of the agent pipeline for debugging and analysis.
from sqlalchemy import Column, String, TIMESTAMP, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid

from .base import Base

class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)

    agent = Column(String, nullable=False)  # Auditor, Strategist, Negotiator
    input_data = Column(JSON)
    output_data = Column(JSON)

    created_at = Column(TIMESTAMP(timezone=True))
