from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import session, engine, Base

from models.project import Project
from models.task import Task

from schemas.project import ProjectRequest, ProjectResponse

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

@app.post("/projects/",response_model=ProjectResponse)
def route_create_project(project_in: ProjectRequest,db: Session = Depends(get_db)):
    return services.crud.create_project(db=db,project=project_in)

