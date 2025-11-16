from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from uuid import UUID

from app.services.transactions_service import (
    get_transactions,
    create_transaction,
)
from app.schemas.transactions import Transaction, TransactionCreate
from app.notifications.transaction_email import send_transaction_email_summary

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("/", response_model=List[Transaction])
def read_transactions(user_id: UUID):
    try:
        return get_transactions(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=Transaction)
def new_transaction(payload: TransactionCreate, background_tasks: BackgroundTasks):
    try:
        created = create_transaction(payload)
        background_tasks.add_task(
            send_transaction_email_summary,
            payload.user_id,
            created,
        )
        return created
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
