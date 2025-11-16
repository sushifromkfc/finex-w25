from datetime import datetime
from textwrap import dedent
from uuid import UUID

from app.integrations.email_client import send_email
from app.services.budgets_service import get_budgets
from app.services.transactions_service import get_transactions
from app.services.users_service import get_user


def _safe_sum(items, key):
    total = 0.0
    for item in items:
        try:
            total += float(item.get(key, 0) or 0)
        except (TypeError, ValueError):
            continue
    return total


def send_transaction_email_summary(user_id: UUID, transaction: dict):
    """Send a summary email after a new transaction is created."""

    try:
        user = get_user(user_id)
    except Exception:
        return

    user_email = user.get("email") if user else None
    user_name = user.get("full_name") if user else None

    if not user_email:
        return

    try:
        transactions = get_transactions(user_id)
        budgets = get_budgets(user_id)
    except Exception:
        transactions = []
        budgets = []

    now = datetime.now()
    month_key = now.strftime("%Y-%m")
    spent_this_month = _safe_sum(
        [t for t in transactions if str(t.get("date", ""))[:7] == month_key],
        "amount",
    )

    total_budget = _safe_sum(budgets, "monthly_limit")
    remaining = max(total_budget - spent_this_month, 0)

    subject = "Finex Update: New transaction added"
    body = dedent(
        f"""
        Hi {user_name or 'there'},

        We just recorded a new transaction: {transaction.get('name')} for ${transaction.get('amount')} on {transaction.get('date')}.

        Here's where you stand for {now.strftime('%B %Y')}:
        - Spent this month: ${spent_this_month:,.2f}
        - Budget remaining: ${remaining:,.2f} (of ${total_budget:,.2f})

        Keep an eye on your spending trends, and let Finex know if you want help adjusting budgets or canceling recurring charges.
        """
    ).strip()

    send_email(user_email, subject, body)
