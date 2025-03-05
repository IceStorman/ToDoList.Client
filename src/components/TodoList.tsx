import { useEffect, useState } from "react";
import {getTodos, addTodo} from "../mock/api";
import {TodoTask} from "../types/todoTypes.ts";
import TodoItem from "./TodoItem.tsx";

export default function TodoList() {
    const [todos, setTodos] = useState<TodoTask[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        getTodos().then(setTodos);
    }, []);

    const handleTaskClick = (id: number) => {
        console.log(id);
    };

    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
        const todo = await addTodo(newTodo);
        setTodos((prev) => [...prev, todo]);
        setNewTodo("");
    };

    return (
        <div className="App">
            <button onClick={handleAddTodo}>Add</button>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task..."
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
