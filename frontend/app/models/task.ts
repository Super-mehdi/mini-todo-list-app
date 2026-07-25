
enum Status {
    TODO = "To do",
    IN_PROGRESS = "In progress",
    DONE = "Done"
}


export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
}