from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

DB_URL=f"{os.getenv("DATABASE_URL")}"

engine = create_engine(DB_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
