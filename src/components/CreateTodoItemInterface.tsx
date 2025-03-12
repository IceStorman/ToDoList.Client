import {Dispatch, SetStateAction, useState} from "react";
import {TodoTask} from "../types/todoTypes.ts";
import "../styles/CreateTodoItemInterface.scss"
import axiosClient from "../api/axiosClient.ts";

export default function CreateTodoItemInterface({setTodos}: {setTodos: Dispatch<SetStateAction<TodoTask[]>>}){
    const [newTodo, setNewTodo] = useState<string>("");

    const handleAddTodo = async () => {
        if (!newTodo.trim())
            return;

        await axiosClient.post<TodoTask>("/todos/create", {title: newTodo})
            .then(response => {setTodos((prev) => [...prev, response.data])});

        setNewTodo("");
    };

    return(
        <div className="CreateTodoItemInterface">
            <input className="newTodoItemTextField"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task..."
            />
            <button className="createTodoItemButton" onClick={handleAddTodo}>+ Add New Task</button>
        </div>
    );
}