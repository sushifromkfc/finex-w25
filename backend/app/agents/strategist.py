from datetime import datetime
from uuid import UUID

from app.services.transactions_service import get_transactions
from app.services.budgets_service import get_budgets
from app.services.insights_service import create_insight
from app.agents.gemini_client import run_gemini
from app.agents.logger import log_agent_event
from app.schemas.insights import InsightCreate


class StrategistAgent:

    @staticmethod
    def run_realtime(user_id: UUID):
        """
        Called after each transaction event.
        Generates immediate financial advice.
        """

        transactions = get_transactions(user_id)
        if not transactions:
            return {"message": "No transactions for strategist."}

        latest = transactions[-1]  # most recent transaction

        related_transaction_ids = None
        latest_id = latest.get("id")
        if latest_id is not None:
            try:
                related_transaction_ids = [UUID(str(latest_id))]
            except (ValueError, TypeError):
                related_transaction_ids = None

        spent_this_month = sum(
            t["amount"] for t in transactions
            if t["date"].startswith(datetime.now().strftime("%Y-%m"))
        )

        budgets = get_budgets(user_id)
        total_budget = sum(b["monthly_limit"] for b in budgets) if budgets else 0

        prompt = f"""
You are a financial strategist AI.

Most recent transaction:
Name: {latest['name']}
Amount: ${latest['amount']}

Total spent this month so far: ${spent_this_month}
Total user budget: ${total_budget}

Generate one short, friendly, helpful financial advice sentence.
"""

        text = run_gemini(prompt)

        payload = InsightCreate(
            user_id=user_id,
            type="realtime_advice",
            title="Transaction Advice",
            description=text,
            severity=1,
            related_transaction_ids=related_transaction_ids,
        )

        created = create_insight(payload)
        return {"message": "Realtime advice stored.", "insight": created}


    @staticmethod
    def run_weekly(user_id: UUID):
        """
        Weekly financial advice: compares spending trends and budget.
        """

        transactions = get_transactions(user_id)
        budgets = get_budgets(user_id)

        if not budgets:
            return {"message": "User has no budget set."}

        total_budget = sum(b["monthly_limit"] for b in budgets)

        spent_this_month = sum(
            t["amount"] for t in transactions
            if t["date"].startswith(datetime.now().strftime("%Y-%m"))
        )

        prompt = f"""
User spent ${spent_this_month} so far this month.
User monthly budget: ${total_budget}.

Provide friendly, positive weekly financial advice (1-2 sentences).
"""

        advice = run_gemini(prompt)

        payload = InsightCreate(
            user_id=user_id,
            type="weekly_advice",
            title="Weekly Financial Insight",
            description=advice,
            severity=1,
        )

        created = create_insight(payload)
        log_agent_event(
            user_id,
            "Strategist",
            input_data={
                "stage": "weekly",
                "spent_this_month": spent_this_month,
                "total_budget": total_budget,
            },
            output_data={"insight": created},
        )
        return {"message": "Weekly insight stored.", "insight": created}
