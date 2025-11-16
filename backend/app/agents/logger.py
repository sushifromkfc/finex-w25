"""Shared helpers for recording agent activity in Supabase."""

from uuid import UUID
from typing import Any, Optional

from app.schemas.agent_logs import AgentLogCreate
from app.services.agent_logs_service import create_agent_log


def log_agent_event(
    user_id: UUID,
    agent: str,
    *,
    input_data: Optional[Any] = None,
    output_data: Optional[Any] = None,
) -> None:
    """Persist a single agent execution step for observability."""
    payload = AgentLogCreate(
        user_id=user_id,
        agent=agent,
        input_data=input_data,
        output_data=output_data,
    )

    # Intentionally ignore failures so agent flows do not crash on logging issues.
    try:
        create_agent_log(payload)
    except Exception:
        return
