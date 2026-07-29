from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from enum import Enum

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    password: str
    theme: str

    class Config:
        from_attributes = True

class UserThemeUpdate(BaseModel):
    theme: str
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

class TaskUpdate(BaseModel):
        title: str
        description: str
    
        project: str
        priority: str
        status: str
    
        due_date: date | None
        completed: bool
class TaskOut(BaseModel):
    id: int
    title: str
    description: str

    project: str
    priority: str
    status: str

    due_date: date | None
    completed: bool

    created_at: datetime
    user_id: int | None

    class Config:
        from_attributes = True