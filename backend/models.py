
from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    status = Column(String)
    priority = Column(String)
    dueDate = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
