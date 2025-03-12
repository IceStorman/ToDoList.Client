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

export function GetTodoStatusByInt(value: number){
    switch (value){
        case 0:
            return TodoStatus.Pending;
        case 1:
            return TodoStatus.InProgress;
        case 2:
            return TodoStatus.Completed;
    }
}