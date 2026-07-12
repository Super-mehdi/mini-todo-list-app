from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import session, engine, Base

from models.project import Project
from models.task import Task


app = FastAPI()


print('Creating database tables...')
Base.metadata.create_all(bind=engine)
print('Database tables created successfully.')

