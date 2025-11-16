from app.database import supabase
from app.schemas.transactions import TransactionCreate
from uuid import UUID


def get_transactions(user_id: UUID):
    resp = (
        supabase.table("transactions")
        .select("*")
        .eq("user_id", str(user_id))
        .order("date", desc=False)
        .execute()
    )
    return resp.data


def create_transaction(payload: TransactionCreate):
    resp = (
        supabase.table("transactions")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
