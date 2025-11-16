"""Gmail SMTP helper for outbound notifications."""

import os
import smtplib
from email.mime.text import MIMEText
from typing import Tuple

from dotenv import load_dotenv


load_dotenv()

GMAIL_EMAIL = os.getenv("GMAIL_EMAIL")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")


def is_configured() -> bool:
    return bool(GMAIL_EMAIL and GMAIL_APP_PASSWORD)


def send_email(recipient: str, subject: str, body: str) -> Tuple[bool, str | None]:
    """Send an email via Gmail SMTP. Returns (success, error_message)."""

    if not recipient:
        return False, "Missing recipient email"

    if not is_configured():
        return False, "Gmail credentials not configured"

    message = MIMEText(body)
    message["Subject"] = subject
    message["From"] = GMAIL_EMAIL
    message["To"] = recipient

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(GMAIL_EMAIL, GMAIL_APP_PASSWORD)
            smtp.sendmail(GMAIL_EMAIL, [recipient], message.as_string())
        return True, None
    except Exception as exc:
        return False, str(exc)
