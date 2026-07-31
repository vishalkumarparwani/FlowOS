from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Backlog
from schemas import BacklogCreate, BacklogOut

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=list[BacklogOut])
def get_backlogs(db: Session = Depends(get_db)):
    return db.query(Backlog).all()

@router.get("/{backlog_id}", response_model=BacklogOut)
def get_backlog(backlog_id: int, db: Session = Depends(get_db)):
    db_backlog = db.query(Backlog).filter(Backlog.id == backlog_id).first()

    if not db_backlog:
        raise HTTPException(status_code=404, detail="Backlog not found")
    return db_backlog

@router.post("/", response_model=BacklogOut, status_code=201)
def create_task(new_backlog: BacklogCreate, db: Session = Depends(get_db)):
    existing_backlog = db.query(Backlog).filter(Backlog.title == new_backlog.title).first()

    if existing_backlog is not None:
        raise HTTPException(status_code=400, detail="Backlog already exists")

    db_backlog = Backlog(
        title=new_backlog.title,
        project=new_backlog.project,
        priority=new_backlog.priority,
        status=new_backlog.status,
        complexity=new_backlog.complexity,
        due_date=new_backlog.due_date,
        acceptance_criteria=new_backlog.acceptance_criteria,
    )
    db.add(db_backlog)
    db.commit()
    db.refresh(db_backlog)
    return db_backlog

@router.put("/{backlog_id}", response_model=BacklogOut)
def update_backlog(backlog_id: int, task: BacklogCreate, db: Session = Depends(get_db)):
    db_backlog = db.query(Backlog).filter(Backlog.id == backlog_id).first()

    if not db_backlog:
        raise HTTPException(status_code=404, detail="Backlog not found")

    for key, value in task.model_dump().items():
        setattr(db_backlog, key, value)

    db.commit()
    db.refresh(db_backlog)
    return db_backlog

@router.delete("/{backlog_id}", status_code=204)
def delete_backlog(backlog_id: int, db: Session = Depends(get_db)):
    db_backlog = db.query(Backlog).filter(Backlog.id == backlog_id).first()

    if not db_backlog:
        raise HTTPException(status_code=404, detail="Backlog not found")

    db.delete(db_backlog)
    db.commit()