# 🟨 4. insights
# Purpose: Strategist produces these insights after analysis.


from sqlalchemy import Column, String, Integer, TIMESTAMP, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
import uuid

from .base import Base

class Insight(Base):
    __tablename__ = "insights"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)

    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    severity = Column(Integer, nullable=False)

    related_transaction_ids = Column(ARRAY(UUID(as_uuid=True)))

    created_at = Column(TIMESTAMP(timezone=True))

