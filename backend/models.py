from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy import DateTime
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    project = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    due_date = Column(Date)
    status = Column(String, nullable=False, default="planning")
    completed = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))
