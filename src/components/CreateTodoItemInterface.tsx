import React, {Dispatch, SetStateAction, useState} from "react";
import {TodoTask} from "../types/todoTypes.ts";
import "../styles/CreateTodoItemInterface.scss"
import axiosClient from "../api/axiosClient.ts";

export default function CreateTodoItemInterface({setTodos}: {setTodos: Dispatch<SetStateAction<TodoTask[]>>}){
    const [newTodo, setNewTodo] = useState<string>("");
    const [showValidation, setShowValidation] = useState(false);

    const handleTempTextChanges = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setNewTodo(e.target.value);
        setShowValidation(false);
    }

    const handleAddTodo = async () => {
        if (!newTodo.trim() || newTodo.length > 64){
            setShowValidation(true);
            return;
        }

        await axiosClient.post<TodoTask>("/todos/create", {title: newTodo.trimStart()})
            .then(response => {setTodos((prev) => [...prev, response.data])});

        setNewTodo("");
        setShowValidation(false);
    };

    return(
        <div className="CreateTodoItemInterface">
            <input className="newTodoItemTextField"
                type="text"
                value={newTodo}
                onChange={(e) => handleTempTextChanges(e)}
                placeholder="New task..."
            />
            <button className="createTodoItemButton" onClick={handleAddTodo}>+ Add New Task</button>
            {showValidation && (
                <p className="validationMessage">*The title must contain from 1 to 64 symbols</p>
            )
            }
        </div>
    );
}