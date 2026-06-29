from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    priority: str
    deadline: str
    progress: int
    completed: int = 0


class Task(TaskCreate):
    id: int
    completed: int

    class Config:
        from_attributes = True