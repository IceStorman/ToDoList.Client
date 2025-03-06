import { TodoTask, TodoStatus } from "../types/todoTypes";

const todos: TodoTask[] = [
    { id: 1, title: "Wake up", description: "The hardest part of the day", status: TodoStatus.Pending },
    { id: 2, title: "Make coffee", description: "The best part of the day", status: TodoStatus.InProgress },
    { id: 3, title: "Go work", description: "Just the part of the day", status: TodoStatus.Completed }
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

export const deleteTodo = (taskToDelete: TodoTask): Promise<TodoTask[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const taskIndex = todos.indexOf(taskToDelete);
            if (taskIndex > -1) {
                console.log(taskIndex);
                todos.splice(taskIndex, 1);
                resolve(todos);
            }
        }, 200);
    });
};

export const updateTodoStatus = (id: number, newStatus: TodoStatus): Promise<TodoStatus | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const todo = todos.find((t) => t.id === id);
            if (todo) {
                todo.status = newStatus;
            }
            resolve(todo ? todo.status : undefined);
        }, 200);
    });
};

export const updateTodoInfo= (updatedTodo: TodoTask) =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            todos.map((task) =>
                task.id === updatedTodo.id ? { ...task, ...updatedTodo } : task
            );
            resolve(updatedTodo);
        }, 200)
    })
}
