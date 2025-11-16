from app.database import supabase
from app.schemas.transactions import TransactionCreate
from app.utils.numeric import cast_fields_to_float
from uuid import UUID


def get_transactions(user_id: UUID):
    resp = (
        supabase.table("transactions")
        .select("*")
        .eq("user_id", str(user_id))
        .order("date", desc=False)
        .execute()
    )
    for row in resp.data:
        cast_fields_to_float(row, ["amount"])
    return resp.data


def create_transaction(payload: TransactionCreate):
    resp = (
        supabase.table("transactions")
        .insert(payload.model_dump(mode="json"))
        .execute()
    )
    created = resp.data[0]
    cast_fields_to_float(created, ["amount"])
    return created
