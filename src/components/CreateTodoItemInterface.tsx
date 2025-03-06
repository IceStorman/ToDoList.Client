import {Dispatch, SetStateAction, useState} from "react";
import {addTodo} from "../mock/api.ts";
import {TodoTask} from "../types/todoTypes.ts";
import "../styles/CreateTodoItemInterface.scss"

export default function CreateTodoItemInterface({setTodos}: {setTodos: Dispatch<SetStateAction<TodoTask[]>>}){
    const [newTodo, setNewTodo] = useState<string>("");

    const handleAddTodo = async () => {
        if (!newTodo.trim())
            return;

        const todo = await addTodo(newTodo);
        setTodos((prev) => [...prev, todo]);
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
            <button className="createTodoItemButton" onClick={handleAddTodo}>Add</button>
        </div>
    );
}