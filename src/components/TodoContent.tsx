import TodoItem from "./TodoItem.tsx";
import {Dispatch, SetStateAction, useEffect} from "react";
import {getTodos} from "../mock/api.ts";
import {TodoStatus, TodoTask} from "../types/todoTypes.ts";
import "../styles/TodoContent.scss"
import EditTaskMenu from "./EditTaskMenu.tsx";

export default function TodoContent({todos, setTodos}:
    {todos: TodoTask[], setTodos: Dispatch<SetStateAction<TodoTask[]>>}){
    useEffect(() => {
        getTodos().then(setTodos);
    }, [setTodos]);

    return (
        <div className="listContent">
            {todos.map((todoTask) => (
                <TodoItem
                    key={todoTask.id}
                    task={todoTask}
                    setTodos={setTodos}
                />
            ))}
            <EditTaskMenu
                taskToEdit={{ id: 0, title: "", description: "", status: TodoStatus.Pending }}
            />
        </div>
    )
}