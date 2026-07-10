from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import Optional, TYPE_CHECKING
from database import Base


if TYPE_CHECKING :
    from backend.models.task import Task



class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key = True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(1000),nullable=True)
    tasks: Mapped[list["Task"]] = relationship(back_populates="project")
