from app.database import supabase
from app.schemas.agent_logs import AgentLogCreate
from uuid import UUID


def get_agent_logs(user_id: UUID):
    resp = (
        supabase.table("agent_logs")
        .select("*")
        .eq("user_id", str(user_id))
        .order("created_at", desc=True)
        .execute()
    )
    return resp.data


def create_agent_log(payload: AgentLogCreate):
    resp = (
        supabase.table("agent_logs")
        .insert(payload.model_dump(mode="json"))
        .execute()
    )
    return resp.data[0]
