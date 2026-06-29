from sqlalchemy.orm import Session
import models
import schemas


def get_tasks(db: Session):
    return db.query(models.Task).all()


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        priority=task.priority,
        deadline=task.deadline,
        progress=task.progress,
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task:
        db.delete(task)
        db.commit()

    return task
def update_task(db: Session, task_id: int, task: schemas.TaskCreate):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if db_task:
        db_task.title = task.title
        db_task.priority = task.priority
        db_task.deadline = task.deadline
        db_task.progress = task.progress

        db.commit()
        db.refresh(db_task)

    return db_task