from pydantic import BaseModel

from typing import Optional

from schemas.task import TaskResponse

class ProjectRequest(BaseModel):
    title: str
    description: Optional[str] = None


class ProjectResponse(BaseModel):
    id : int
    title: str
    description: Optional[str] = None
    tasks: list[TaskResponse]

    model_config = {'from_attributes': True}