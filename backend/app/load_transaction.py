# backend/scripts/load_transactions.py
import json
from uuid import UUID

from app.database import supabase

USER_ID = UUID("d09097f8-5bc4-438f-82c3-7065c5f2f9ca")

with open("backend/sample_transactions.json") as fh:
    rows = json.load(fh)

payload = []
for row in rows:
    payload.append(
        {
            "user_id": str(USER_ID),
            "date": row["date"],
            "name": row["name"],
            "amount": row["amount"],
            "category": row["category"],
            "is_subscription": row["is_subscription"],
            "source": "mock",
            "raw_json": row,
        }
    )

batch_size = 100
for i in range(0, len(payload), batch_size):
    supabase.table("transactions").insert(payload[i : i + batch_size]).execute()
