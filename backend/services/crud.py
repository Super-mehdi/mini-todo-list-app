from sqlalchemy.orm import Session
from sqlalchemy import select,func

from models.project import Project
from models.task import Task

from schemas.project import ProjectRequest, ProjectResponse
from schemas.task import TaskRequest, TaskResponse

#Project CRUD operations
def create_project(db: Session, project: ProjectRequest) -> Project:
    db_project = Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_project(db: Session, projectId: int) -> Project:
    project = db.get(Project,projectId)
    return project

def get_all_projects(db: Session) -> list[Project]:
    projects = db.query(Project).all()
    return projects

def get_project_by_name(db: Session, projectName: str) -> list[Project]:
    projects = db.scalars(select(Project).where(Project.title.ilike(f'%{projectName}%'))).all()
    return projects

def update_project(db: Session, id: int, projectRequest: ProjectRequest) -> Project:
    project = db.get(Project,id)
    if not project:
        return "Project not found"
    if projectRequest.title:
        project.title = projectRequest.title
    if projectRequest.description and projectRequest.description.strip() :
        project.description = projectRequest.description 
    db.commit()
    db.refresh(project)
    return project

def delete_project_by_id(db: Session, id: int):
    project = db.get(Project,id)
    if not project:
        return "Not matching project was found !"
    db.delete(project)
    db.commit()
    return project

#Task crud operations

def create_task(db: Session, task_in: TaskRequest)->Task:
    db_task = Task(**task_in.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task_by_project_id(db: Session, project_id: int)->list[Task]:
    tasks = db.scalars(select(Task).where(Task.project_id == project_id)).all()
    return tasks

def get_task_by_id(db: Session, project_id: int, task_id: int):
    db_task = db.scalar(select(Task).where(Task.project_id == project_id and Task.id==task_id))
    return db_task

def update_task(db: Session, task_id: int,task_in: TaskRequest):
    task = get_task_by_id(db,task_in.project_id,task_id)
    if task_in.title and task_in.title.strip():
        task.title = task_in.title
    if task_in.description and task_in.description.strip():
        task.description = task_in.description
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id:int,project_id:int):
    db_task = get_task_by_id(db,project_id,task_id)
    if not db_task:
        return "No matching task was found !"
    db.delete(db_task)
    db.commit()
    return db_task