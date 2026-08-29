from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from database import get_db
from models import Issue

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/")
def get_services(db: Session = Depends(get_db)):
    try:
        issues = db.query(Issue).all()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Failed to load services")

    services = {}
    for issue in issues:
        if issue.service not in services:
            services[issue.service] = []
        services[issue.service].append(issue)

    return services