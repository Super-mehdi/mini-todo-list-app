from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import session, engine, Base

from models.project import Project
from models.task import Task


app = FastAPI()

print("Database URL:", engine.url)
print("Registered tables:", list(Base.metadata.tables.keys()))

print('Creating database tables...')
Base.metadata.create_all(bind=engine)
print('Database tables created successfully.')

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1"))
    return {"database": result.scalar() == 1}