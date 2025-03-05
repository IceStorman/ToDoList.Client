export enum TodoStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed"
}

export interface TodoTask {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}
