import os
from dotenv import load_dotenv
from google import genai

# Load .env file
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("ERROR: GEMINI_API_KEY not found. Check your .env file.")

# Gemini client
client = genai.Client(api_key=API_KEY)

def run_gemini(prompt: str) -> str:
    """
    Utility function to send prompts to Gemini.
    Returns text output.
    """
    response = client.models.generate_content(
        model="gemini-1.5-pro",
        contents=prompt
    )
    return response.text
