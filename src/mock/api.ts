import { TodoTask, TodoStatus } from "../types/todoTypes";

let todos: TodoTask[] = [
];

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

export const updateTodoInfo= (updatedTodo: TodoTask): Promise<TodoTask[]> =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            todos = todos.map((task) =>
                task.id === updatedTodo.id ? { ...task, ...updatedTodo } : task
            );
            resolve(todos);
        }, 200)
    })
}
