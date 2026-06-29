from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from ai import generate_plan
from chat import chat_with_ai

import models
import schemas
import crud

from database import engine, Base, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Deadline Guardian AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://deadline-guardian-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message":
        "Deadline Guardian AI Backend Running 🚀"
    }


@app.get(
    "/tasks",
    response_model=list[schemas.Task]
)
def get_all_tasks(
        db: Session = Depends(get_db)
):
    return crud.get_tasks(db)


@app.post(
    "/tasks",
    response_model=schemas.Task
)
def add_task(
        task: schemas.TaskCreate,
        db: Session = Depends(get_db)
):
    return crud.create_task(
        db,
        task
    )


@app.put(
    "/tasks/{task_id}",
    response_model=schemas.Task
)
def edit_task(

        task_id: int,

        task: schemas.TaskCreate,

        db: Session = Depends(get_db)

):

    return crud.update_task(

        db,

        task_id,

        task

    )


@app.put("/tasks/{task_id}/progress")
def update_progress(

        task_id: int,

        progress: int,

        db: Session = Depends(get_db)

):

    task = db.query(

        models.Task

    ).filter(

        models.Task.id == task_id

    ).first()

    if not task:

        raise HTTPException(

            status_code=404,

            detail="Task not found"

        )

    task.progress = progress

    db.commit()

    db.refresh(task)

    return task


@app.delete("/tasks/{task_id}")
def remove_task(

        task_id: int,

        db: Session = Depends(get_db)

):

    crud.delete_task(

        db,

        task_id

    )

    return {

        "message":

        "Task Deleted"

    }


@app.post("/chat")
def chat(

        data: dict

):

    reply = chat_with_ai(

        data["message"]

    )

    return {

        "reply":

        reply

    }


@app.post("/generate-plan")
def generate_ai_plan(

        db: Session = Depends(get_db)

):

    tasks = crud.get_tasks(db)

    task_text = ""

    for task in tasks:

        task_text += f"""

Task : {task.title}

Priority : {task.priority}

Deadline : {task.deadline}

Progress : {task.progress}

"""

    plan = generate_plan(

        task_text

    )

    return {

        "plan":

        plan

    }