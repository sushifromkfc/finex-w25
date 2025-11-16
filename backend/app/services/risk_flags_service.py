from app.database import supabase
from app.schemas.risk_flags import RiskFlagCreate
from uuid import UUID


def get_risk_flags(user_id: UUID):
    resp = (
        supabase.table("risk_flags")
        .select("*")
        .eq("user_id", str(user_id))
        .order("created_at", desc=True)
        .execute()
    )
    return resp.data


def create_risk_flag(payload: RiskFlagCreate):
    resp = (
        supabase.table("risk_flags")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
