# 🟥 5. risk_flags
# Purpose: Stored results from Auditor agent.



from sqlalchemy import Column, String, Boolean, TIMESTAMP, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid

from .base import Base

class RiskFlag(Base):
    __tablename__ = "risk_flags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)

    flag_type = Column(String, nullable=False)
    details = Column(JSON, nullable=False)

    resolved = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True))

