import { TodoTask, TodoStatus } from "../types/todoTypes";

const todos: TodoTask[] = [
    { id: 1, title: "Learn React", description: "", status: TodoStatus.Pending },
    { id: 2, title: "Set up mock API", description: "", status: TodoStatus.InProgress },
    { id: 3, title: "Build UI components", description: "", status: TodoStatus.Completed }
];

export const getTodos = (): Promise<TodoTask[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...todos]), 200);
    });
};

export const addTodo = (title: string): Promise<TodoTask> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTodo: TodoTask = { id: todos.length + 1, title: title, description: "", status: TodoStatus.Pending };
            todos.push(newTodo);
            console.log(todos);
            resolve(newTodo);
        }, 200);
    });
};

export const updateTodoStatus = (id: number, newStatus: TodoStatus): Promise<TodoTask | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const todo = todos.find((t) => t.id === id);
            if (todo) todo.status = newStatus;
            resolve(todo);
        }, 200);
    });
};
