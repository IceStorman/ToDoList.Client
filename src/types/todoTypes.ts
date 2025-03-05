export enum TodoStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed"
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}
