from uuid import UUID

from app.database import supabase
from app.schemas.budgets import BudgetCreate, BudgetUpdate
from app.utils.numeric import cast_fields_to_float


def get_budgets(user_id: UUID):
    resp = (
        supabase.table("budgets")
        .select("*")
        .eq("user_id", str(user_id))
        .execute()
    )
    for row in resp.data:
        cast_fields_to_float(row, ["monthly_limit"])
    return resp.data


def create_budget(payload: BudgetCreate):
    data = payload.dict()
    if not data.get("category"):
        data["category"] = "Total Budget"
    resp = (
        supabase.table("budgets")
        .insert(data)
        .execute()
    )
    created = resp.data[0]
    cast_fields_to_float(created, ["monthly_limit"])
    return created


def update_budget(budget_id: UUID, payload: BudgetUpdate):
    data = payload.dict(exclude_none=True)
    data.pop("category", None)
    resp = (
        supabase.table("budgets")
        .update(data)
        .eq("id", str(budget_id))
        .execute()
    )
    if not resp.data:
        raise ValueError("Budget not found")
    updated = resp.data[0]
    cast_fields_to_float(updated, ["monthly_limit"])
    return updated
