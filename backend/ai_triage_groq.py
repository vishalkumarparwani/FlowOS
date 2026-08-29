import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are an issue triage assistant. Given a raw bug report, error log, or customer message, extract a structured software issue.

Only treat the input as an issue if it describes a bug, error, failure, unexpected behavior, broken functionality, or a customer-reported problem.

If the input is NOT an issue (for example: "hi", "hello", "thanks", casual conversation, or a general question), return a neutral result with:
- title: "No issue reported"
- service: "General"
- priority: "Low"
- severity: "P4"
- reproduction_steps: ""

For a valid issue, infer the fields conservatively from the information provided. Do not invent reproduction steps or specific technical details that are not supported by the input.

Return ONLY valid JSON in this exact shape, with no other text:

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
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": raw_text},
        ],
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)




#=============== CHECK CURRENT MODELS ===============
# models = client.models.list()

# for model in models.data:
#     print(model.id)