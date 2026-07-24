from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import session, engine, Base

from models.project import Project
from models.task import Task

from schemas.project import ProjectRequest, ProjectResponse
from schemas.task import TaskRequest, TaskResponse

import services.crud

@asynccontextmanager
async def lifespan(app: FastAPI):
    print('Creating database tables...')
    Base.metadata.create_all(bind=engine)
    print('Database tables created successfully.')
    yield


app = FastAPI(lifespan=lifespan)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

#test
@app.get("/test")
def route_test():
    return "I am finerr !!"
#project endpoints

@app.post("/projects/",response_model=ProjectResponse)
def route_create_project(project_in: ProjectRequest,db: Session = Depends(get_db)):
    return services.crud.create_project(db=db,project=project_in)

@app.get("/project/{projectId}",response_model=ProjectResponse)
def route_get_project(projectId: int, db: Session=Depends(get_db)):
    return services.crud.get_project(db,projectId)

@app.get("/all_projects",response_model=list[ProjectResponse])
def route_get_all_projects(db: Session=Depends(get_db)):
    return services.crud.get_all_projects(db)

@app.get("/projects/{projectName}", response_model=list[ProjectResponse])
def route_get_project_by_name(projectName,db: Session=Depends(get_db)):
    return services.crud.get_project_by_name(db,projectName)

@app.put("/update_project/{id}")
def route_update_project(id,project_in: ProjectRequest, db: Session=Depends(get_db)):
    return services.crud.update_project(db,id,project_in)

@app.delete("/delete_project/{id}")
def route_delete_project(id: int, db: Session=Depends(get_db)):
    return services.crud.delete_project_by_id(db,id)

#Tasks endpoints

@app.post("/add_task", response_model=TaskResponse)
def route_create_task(task_in: TaskRequest,db: Session=Depends(get_db)):
    return services.crud.create_task(db,task_in)
    