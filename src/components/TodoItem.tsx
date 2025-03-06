import {TodoStatus, TodoTask} from "../types/todoTypes";
import {deleteTodo, updateTodoStatus} from "../mock/api.ts";
import "../styles/TodoItem.scss"
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

export default function TodoItem({ task, setTodos }: {task: TodoTask, setTodos: Dispatch<SetStateAction<TodoTask[]>>}) {
    const onDelete = async (taskToDelete: TodoTask) => {
        const updatedTodos = await deleteTodo(taskToDelete);
        console.log(updatedTodos);
        setTodos(() => [...updatedTodos]);
    }

    const onEditRequested = () => {};

    const [status, setStatus] = useState<TodoStatus>(task.status);

    const onTaskStatusUpdated = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newStatus = await updateTodoStatus(task.id, e.target.value as TodoStatus);
        if (newStatus) {
            setStatus(newStatus);
        }
    }

    return (
        <div className="todoItem">
            <div className="todoText">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </div>
            <div className="interactButtons">
                <select
                    value={status}
                    onChange={(e) => onTaskStatusUpdated(e)}
                >
                    {Object.values(TodoStatus).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button onClick={() => onDelete(task)} className="manipulateTaskButton">
                    ❌
                </button>
                <button onClick={() => onEditRequested()} className="manipulateTaskButton">
                    ✏️
                </button>
            </div>

        </div>
    );
}