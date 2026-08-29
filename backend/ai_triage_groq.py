import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are an issue triage assistant. Given a raw bug report, error log, or customer message, extract a structured issue.

Return ONLY valid JSON in this exact shape, no other text:
{
  "title": "short, clear issue title",
  "service": "best-guess service/component name, e.g. Authentication, Core API, Database",
  "priority": "High" | "Medium" | "Low",
  "severity": "P1" | "P2" | "P3" | "P4",
  "reproduction_steps": "steps if mentioned, one per line, or empty string"
}
"""

def extract_issue_from_text(raw_text: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": raw_text},
        ],
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)