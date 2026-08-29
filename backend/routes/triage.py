from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ai_triage_groq import extract_issue_from_text

router = APIRouter(prefix="/triage", tags=["triage"])

class TriageRequest(BaseModel):
    raw_text: str

@router.post("/")
def run_triage(request: TriageRequest):
    try:
        return extract_issue_from_text(request.raw_text)
    except Exception as error:
        print("AI TRIAGE ERROR:", error)
        raise HTTPException(status_code=500, detail="AI triage failed. Please try again.")