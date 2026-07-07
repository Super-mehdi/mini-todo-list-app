from enum import Enum

class TaskStatus(str, Enum):
    TODO = "To do"
    IN_PROGRESS = "In progress"
    DONE = "Done"
