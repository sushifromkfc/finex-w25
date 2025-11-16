from datetime import datetime, timedelta, date
from textwrap import dedent
from uuid import UUID

from app.services.transactions_service import get_transactions
from app.services.budgets_service import get_budgets
from app.services.insights_service import create_insight
from app.services.users_service import get_user
from app.agents.gemini_client import run_gemini
from app.agents.logger import log_agent_event
from app.integrations.email_client import send_email
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

        Assumes this is called on *Monday at 00:00*.
        It will summarize the week that JUST FINISHED:
        last Monday (inclusive) -> last Sunday (inclusive).
        """

        transactions = get_transactions(user_id)
        budgets = get_budgets(user_id)

        if not budgets:
            return {"message": "User has no budget set."}

        total_budget = sum(b["monthly_limit"] for b in budgets)

        now = datetime.now()
        today: date = now.date()

        # Monday of the CURRENT week (the one that just started)
        this_monday: date = today - timedelta(days=today.weekday())
        # Monday of the PREVIOUS week
        last_monday: date = this_monday - timedelta(days=7)
        # Sunday of the previous week
        last_sunday: date = this_monday - timedelta(days=1)

        # Time window: [last_monday, this_monday)
        start_of_week = last_monday
        exclusive_end = this_monday

        week_label = (
            f"Week of {last_monday.strftime('%b %d')} – "
            f"{last_sunday.strftime('%b %d')} (7-day recap)"
        )

        def _to_date(raw_date):
            """
            Convert various date representations into a date object.
            Supports:
            - date
            - datetime
            - ISO strings "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS"
            """
            if isinstance(raw_date, date) and not isinstance(raw_date, datetime):
                return raw_date
            if isinstance(raw_date, datetime):
                return raw_date.date()

            s = str(raw_date)
            try:
                if "T" in s:
                    return datetime.fromisoformat(s).date()
                # plain date
                return datetime.strptime(s, "%Y-%m-%d").date()
            except ValueError:
                # best effort: try fromisoformat as fallback
                try:
                    return datetime.fromisoformat(s).date()
                except Exception:
                    return None

        week_transactions = []
        for t in transactions:
            tx_date = _to_date(t.get("date"))
            if tx_date is None:
                continue
            if start_of_week <= tx_date < exclusive_end:
                week_transactions.append(t)

        spent_this_week = sum(t["amount"] for t in week_transactions)

        prompt = f"""
Summarize the user's spending for {week_label} only.

Total budget (monthly context): ${total_budget}
Spent during {week_label}: ${spent_this_week}

Give a short, encouraging weekly tip (1-2 sentences) referencing this week's activity only.
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

        # --- Email sending ---
        user_email = None
        user_name = "there"
        user_error = None
        try:
            user = get_user(user_id)
            if user:
                user_email = user.get("email")
                user_name = user.get("full_name") or (
                    user_email.split("@")[0] if user_email else "there"
                )
        except Exception as exc:
            user_error = str(exc)

        email_status = {"sent": False, "error": None}
        if user_error:
            email_status["error"] = f"Unable to fetch user: {user_error}"
        elif not user_email:
            email_status["error"] = "No user email on file"
        else:
            subject = "Your Finex Weekly Spending Tip"
            body = dedent(
                f"""
                Hi {user_name},

                Here's your {week_label} Finex summary:
                - Monthly budget (for context): ${total_budget:,.2f}
                - Spent this week: ${spent_this_week:,.2f}

                Insight:
                {advice}

                Keep building great habits!
                """
            ).strip()

            sent, error = send_email(user_email, subject, body)
            email_status = {"sent": sent, "error": error}

        # --- Logging ---
        log_agent_event(
            user_id,
            "Strategist",
            input_data={
                "stage": "weekly",
                "spent_this_week": spent_this_week,
                "total_budget": total_budget,
            },
            output_data={
                "insight": created,
                "email_status": email_status,
                "week": {
                    "label": week_label,
                    "start": start_of_week.isoformat(),
                    "end": last_sunday.isoformat(),
                },
            },
        )

        return {
            "message": "Weekly insight stored.",
            "insight": created,
            "email_status": email_status,
            "week": {
                "label": week_label,
                "start": start_of_week.isoformat(),
                "end": last_sunday.isoformat(),
            },
        }
