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

class TaskPriority(str, Enum):
    high = "High"
    medium = "Medium"
    low = "Low"

class TaskCreate(BaseModel):
    title: str
    project: str
    priority: TaskPriority = TaskPriority.medium
    status: TaskStatus = TaskStatus.planning
    due_date: date | None = None
    completed: bool = False


class TaskOut(BaseModel):
    id: int
    title: str
    project: str
    priority: str
    status: str
    due_date: date | None
    completed: bool
    created_at: datetime
    user_id: int | None

    class Config:
        from_attributes = True