import { useState } from "react";
import {TodoStatus, TodoTask} from "../types/todoTypes.ts";
import "../styles/TodoList.scss"
import CreateTodoItemInterface from "./CreateTodoItemInterface.tsx";
import TodoContent from "./TodoContent.tsx";
import EditTaskMenu from "./EditTaskMenu.tsx";

export default function TodoList() {
    const [todos, setTodos] = useState<TodoTask[]>([]);

    return (
        <div className="app">
            <h1 className="title">Todo list</h1>
            <hr/>

            <div className="listContainer">
                <CreateTodoItemInterface
                    setTodos={setTodos}
                />
                <TodoContent
                    todos={todos}
                    setTodos={setTodos}
                />
                <EditTaskMenu
                    taskToEdit={{ id: 0, title: "", description: "", status: TodoStatus.Pending }}
                />
            </div>
        </div>
    );
}
