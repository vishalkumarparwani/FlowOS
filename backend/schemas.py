from pydantic import BaseModel
from datetime import date, datetime
from enum import Enum

class UserCreate(BaseModel):
    username: str
    password: str

class TaskStatus(str, Enum):
    planning = "planning"
    in_progress = "in_progress"
    done = "done"

class TaskCreate(BaseModel):
    title: str
    project: str
    priority: str
    status: TaskStatus = TaskStatus.planning
    dueDate: date | None = None


class TaskOut(BaseModel):
    title: str
    project: str
    priority: str
    status: str
    due_date: date | None
    created_at: datetime
    user_id: int | None

    class Config:
        from_attributes = True