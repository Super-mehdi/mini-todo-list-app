from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

import os


DB_URL=f"{os.getenv("DATABASE_URL")}"

engine = create_engine(DB_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
