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