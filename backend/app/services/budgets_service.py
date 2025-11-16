from app.database import supabase
from app.schemas.budgets import BudgetCreate
from uuid import UUID


def get_budgets(user_id: UUID):
    resp = (
        supabase.table("budgets")
        .select("*")
        .eq("user_id", str(user_id))
        .execute()
    )
    return resp.data


def create_budget(payload: BudgetCreate):
    resp = (
        supabase.table("budgets")
        .insert(payload.dict())
        .execute()
    )
    return resp.data[0]
