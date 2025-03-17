import TodoItem from "./TodoItem.tsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {TodoTask} from "../types/todoTypes.ts";
import "../styles/TodoContent.scss"
import EditTaskMenu from "./EditTaskMenu.tsx";
import axiosClient from "../api/axiosClient.ts";

export default function TodoContent({todos, setTodos}:
    {todos: TodoTask[], setTodos: Dispatch<SetStateAction<TodoTask[]>>}){
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<TodoTask | null>(null);

    useEffect(() => {
        axiosClient.get<TodoTask[]>("/todos")
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleEditRequest = (task: TodoTask) => {
        setTaskToEdit(task);
        setIsEditOpen(true);
    };

    return (
        <div className="listContent">
            {todos.map((todoTask) => (
                <TodoItem
                    key={todoTask.id}
                    task={todoTask}
                    setTodos={setTodos}
                    onEditRequested={() => handleEditRequest(todoTask)}
                />
            ))}
            {isEditOpen && taskToEdit && (
                <EditTaskMenu
                    taskToEdit={taskToEdit}
                    setTaskToEdit={setTaskToEdit}
                    setTodos={setTodos}
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                />
            )}
        </div>
    )
}