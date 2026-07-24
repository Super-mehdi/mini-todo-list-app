from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from enums.task_status import TaskStatus

from database import Base


from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from backend.models.project import Project



class Task(Base):
    __tablename__="tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id",ondelete="CASCADE"))
    project: Mapped["Project"] = relationship("Project",back_populates= "tasks")
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus),default=TaskStatus.TODO)
