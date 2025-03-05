import { useEffect, useState } from "react";
import { getTodos, updateTodoStatus, addTodo } from "../mock/api";
import { Todo, TodoStatus } from "../types/todoTypes.ts";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        getTodos().then(setTodos);
    }, []);

    const handleStatusChange = async (id: number, newStatus: TodoStatus) => {
        const updatedTodo = await updateTodoStatus(id, newStatus);
        if (updatedTodo) {
            setTodos((prev) =>
                prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
            );
        }
    };

    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
        const todo = await addTodo(newTodo);
        setTodos((prev) => [...prev, todo]);
        setNewTodo("");
    };

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} -
                        <select
                            value={todo.status}
                            onChange={(e) => handleStatusChange(todo.id, e.target.value as TodoStatus)}
                        >
                            {Object.values(TodoStatus).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task..."
            />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
}
