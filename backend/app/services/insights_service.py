from uuid import UUID

from app.database import supabase
from app.schemas.insights import InsightCreate
from app.utils.numeric import cast_fields_to_float


def get_insights(user_id: UUID):
    resp = (
        supabase.table("insights")
        .select("*")
        .eq("user_id", str(user_id))
        .order("id", desc=True)
        .execute()
    )
    for row in resp.data:
        cast_fields_to_float(row, ["severity"])
    return resp.data


def create_insight(payload: InsightCreate):
    resp = (
        supabase.table("insights")
        .insert(payload.model_dump(mode="json"))
        .execute()
    )
    created = resp.data[0]
    cast_fields_to_float(created, ["severity"])
    return created
