from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


import os

Base = declarative_base()


DB_URL=f"{os.getenv("DATABASE_URL")}"

engine = create_engine(DB_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
