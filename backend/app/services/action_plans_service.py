from app.database import supabase
from app.schemas.action_plans import ActionPlanCreate
from uuid import UUID


def get_action_plans(user_id: UUID):
    resp = (
        supabase.table("action_plans")
        .select("*")
        .eq("user_id", str(user_id))
        .order("created_at", desc=True)
        .execute()
    )
    return resp.data


def create_action_plan(payload: ActionPlanCreate):
    resp = (
        supabase.table("action_plans")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
