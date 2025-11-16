from app.database import supabase
from app.schemas.insights import InsightCreate
from uuid import UUID


def get_insights(user_id: UUID):
    resp = (
        supabase.table("insights")
        .select("*")
        .eq("user_id", str(user_id))
        .order("created_at", desc=True)
        .execute()
    )
    return resp.data


def create_insight(payload: InsightCreate):
    resp = (
        supabase.table("insights")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
