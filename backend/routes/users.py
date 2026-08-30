from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from database import get_db
from models import User
from schemas import UserOut, UserThemeUpdate
from auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.patch("/theme", response_model=UserOut)
def update_theme(update: UserThemeUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if update.theme not in ("light", "dark"):
        raise HTTPException(status_code=400, detail="Theme must be 'light' or 'dark'")

    current_user.theme = update.theme
    try:
        db.commit()
        db.refresh(current_user)
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update theme")

    return current_user