from sqlalchemy import Column, Integer, String

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    priority = Column(String, nullable=False)

    deadline = Column(String, nullable=False)

    progress = Column(Integer, default=0)

    completed = Column(Integer, default=0)