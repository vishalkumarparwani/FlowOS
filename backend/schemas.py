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
class BacklogStatus(str, Enum):
    planning = "planning"
    in_progress = "in_progress"
    done = "done"
class BacklogPriority(str, Enum):
    high = "High"
    medium = "Medium"
    low = "Low"

class BacklogCreate(BaseModel):
    title: str
    project: str
    priority: BacklogPriority = BacklogPriority.medium
    status: BacklogStatus = BacklogStatus.planning
    due_date: date | None = None
    completed: bool = False

class BacklogUpdate(BaseModel):
        title: str
        description: str
    
        project: str
        priority: str
        status: str
    
        due_date: date | None
        completed: bool
class BacklogOut(BaseModel):
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