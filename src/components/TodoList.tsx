import { useEffect, useState } from "react";
import {getTodos} from "../mock/api";
import {TodoTask} from "../types/todoTypes.ts";
import TodoItem from "./TodoItem.tsx";
import "../styles/TodoList.scss"
import CreateTodoItemInterface from "./CreateTodoItemInterface.tsx";

export default function TodoList() {
    const [todos, setTodos] = useState<TodoTask[]>([]);

    useEffect(() => {
        getTodos().then(setTodos);
    }, []);

    const handleTaskClick = (id: number) => {
        console.log(id);
    };

    return (
        <div className="list">
            <h1 className="title">Todo list</h1>
            <hr/>
            <CreateTodoItemInterface
                setTodos={setTodos}
            />
            <ul>
                {todos.map((todoTask) => (
                    <TodoItem
                        key={todoTask.id}
                        task={todoTask}
                        defaultOnClick={() => handleTaskClick(todoTask.id)}
                    />
                ))}
            </ul>
        </div>
    );
}
