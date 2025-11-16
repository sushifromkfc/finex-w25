from datetime import datetime, timedelta
from typing import List
from uuid import UUID

from app.services.transactions_service import get_transactions
from app.services.risk_flags_service import create_risk_flag
from app.agents.gemini_client import run_gemini


class AuditorAgent:

    @staticmethod
    def run(user_id: UUID):
        """
        Performs anomaly detection, spike detection, and large spending detection.
        Writes risk flags into DB.
        """

        transactions = get_transactions(user_id)
        if not transactions:
            return {"message": "No transactions to audit."}

        # Build summary for prompting
        summary = [
            f"{t['date']}: {t['name']} - ${t['amount']}"
            for t in transactions
        ]
        text_list = "\n".join(summary)

        prompt = f"""
You are a financial auditor AI.

Given this list of transactions:

{text_list}

1. Identify unusual spending patterns.
2. Identify large transactions.
3. Identify suspicious spikes or frequency changes.
4. Output a structured JSON list of risk flags. Use format:
[
  {{
    "flag_type": "...",
    "details": {{
       "reason": "...",
       "amount": ...
    }}
  }}
]
If no risk flags exist, return an empty list [].
"""

        output = run_gemini(prompt)

        # Gemini will return JSON-like text
        # We will eval this safely (hackathon OK)
        try:
            risk_flags = eval(output)
        except:
            risk_flags = []

        # Store in DB
        stored = []
        for flag in risk_flags:
            payload = {
                "user_id": str(user_id),
                "flag_type": flag["flag_type"],
                "details": flag["details"]
            }
            created = create_risk_flag(payload)
            stored.append(created)

        return {
            "message": "Auditor completed.",
            "risk_flags_created": len(stored),
            "risk_flags": stored
        }
