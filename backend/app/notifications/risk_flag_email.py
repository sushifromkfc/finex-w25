from textwrap import dedent
from uuid import UUID

from app.integrations.email_client import send_email
from app.schemas.risk_flags import RiskFlagCreate
from app.services.budgets_service import get_budgets
from app.services.risk_flags_service import create_risk_flag
from app.services.users_service import get_user


def check_and_notify_large_transaction(user_id: UUID, transaction: dict):
    """Create a risk flag and email if a single transaction exceeds 20% budget."""

    try:
        budgets = get_budgets(user_id)
    except Exception:
        budgets = []

    total_budget = sum(float(b.get("monthly_limit") or 0) for b in budgets)
    if total_budget <= 0:
        return

    amount = float(transaction.get("amount") or 0)
    threshold = total_budget * 0.2
    if amount < threshold:
        return

    details = {
        "reason": "Single transaction exceeded 20% of monthly budget",
        "amount": amount,
        "threshold": threshold,
        "transaction_name": transaction.get("name"),
        "transaction_date": transaction.get("date"),
    }

    flag_payload = RiskFlagCreate(
        user_id=user_id,
        flag_type="Large Single Spend",
        details=details,
    )

    try:
        create_risk_flag(flag_payload)
    except Exception:
        pass

    try:
        user = get_user(user_id)
    except Exception:
        user = None

    user_email = user.get("email") if user else None
    user_name = user.get("full_name") if user else None
    if not user_email:
        return

    body = dedent(
        f"""
        Hi {user_name or 'there'},

        We noticed a single transaction ({transaction.get('name')} for ${amount:.2f}) that used more than 20% of your monthly budget (${total_budget:.2f}).

        Keep an eye on this expense and adjust budgets or habits if needed. We'll continue monitoring your spending patterns.
        """
    ).strip()

    send_email(user_email, "Finex Alert: Large Transaction Detected", body)
