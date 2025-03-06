import {TodoTask} from "../types/todoTypes";
import {deleteTodo} from "../mock/api.ts";
import "../styles/TodoItem.scss"
import {Dispatch, SetStateAction} from "react";

export default function TodoItem({ task, setTodos }: {task: TodoTask, setTodos: Dispatch<SetStateAction<TodoTask[]>>}) {
    const onDelete = async (taskToDelete: TodoTask) => {
        const updatedTodos = await deleteTodo(taskToDelete);
        console.log(updatedTodos);
        setTodos(() => [...updatedTodos]);
    }

    const onEditRequested = () => {};

    return (
        <div className="todoItem">
            <div className="todoText">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </div>
            <div className="interactButtons">
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