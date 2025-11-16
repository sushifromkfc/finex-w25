import os

import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash-latest")
FALLBACK_MODEL = os.getenv("GEMINI_FALLBACK_MODEL", "gemini-2.0-flash")

if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in environment")

genai.configure(api_key=GEMINI_API_KEY)


def _run(prompt: str, model_name: str) -> str:
    model = genai.GenerativeModel(model_name)
    response = model.generate_content(prompt)
    return response.text or ""


def run_gemini(prompt: str) -> str:
    """Call Gemini with automatic fallback when a model is unavailable."""

    try:
        return _run(prompt, GEMINI_MODEL)
    except Exception as primary_error:
        try:
            return _run(prompt, FALLBACK_MODEL)
        except Exception as fallback_error:
            return f"[Gemini Error] {primary_error} | fallback: {fallback_error}"
