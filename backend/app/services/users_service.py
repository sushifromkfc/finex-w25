from app.database import supabase
from app.schemas.users import UserCreate
from uuid import UUID


def get_user(user_id: UUID):
    resp = (
        supabase.table("users")
        .select("*")
        .eq("id", str(user_id))
        .single()
        .execute()
    )
    return resp.data


def create_user(payload: UserCreate):
    resp = (
        supabase.table("users")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
