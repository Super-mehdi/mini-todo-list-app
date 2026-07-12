from sqlalchemy.orm import Session

from models.project import Project
from models.task import Task

from schemas.project import ProjectRequest, ProjectResponse
from schemas.task import TaskRequest, TaskResponse

#Project CRUD operations
def create_project(db: Session, project: ProjectRequest) -> ProjectResponse:
    db_project = Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project