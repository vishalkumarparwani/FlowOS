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

class BacklogComplexity(str, Enum):
    XL = "XL"
    L = "L"
    M = "M"
    S = "S"

class BacklogCreate(BaseModel):
    title: str
    project: str
    priority: BacklogPriority = BacklogPriority.medium
    status: BacklogStatus = BacklogStatus.planning
    due_date: date | None = None
    complexity: BacklogComplexity = BacklogComplexity.M
    acceptance_criteria: str | None = None


class BacklogUpdate(BaseModel):
    title: str
    project: str
    priority: str
    status: str
    due_date: date | None
    complexity: str | None = None
    acceptance_criteria: str | None = None


class BacklogOut(BaseModel):
    id: int
    title: str
    project: str
    priority: str
    status: str
    due_date: date | None
    complexity: str | None = None
    acceptance_criteria: str | None = None
    created_at: datetime
    user_id: int | None

    class Config:
        from_attributes = True