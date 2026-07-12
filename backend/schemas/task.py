from pydantic import BaseModel

from typing import Optional

from enums.task_status import TaskStatus

class TaskRequest(BaseModel):
    title: str
    description: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: TaskStatus

    model_config = {'from_attributes': True}
