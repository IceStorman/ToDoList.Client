import React, {useState} from "react";
import "../styles/EditTaskMenu.scss"
import {TodoStatus, TodoTask} from "../types/todoTypes.ts";

export default function EditTaskMenu({taskToEdit}:{taskToEdit: TodoTask}) {
    const [editedTask, setEditedTask] = useState<TodoTask>(taskToEdit);

    const handleTempChanges = (e: React.ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    function onCancel() {
        
    }

    function onSave(editedTask: TodoTask) {
        console.log(editedTask);
    }

    return(
        <div className="editWindow">
            <input
                type="text"
                name="title"
                value={editedTask.title}
                placeholder={"Title..."}
                onChange={handleTempChanges}
            />
            <textarea
                name="description"
                value={editedTask.description}
                placeholder={"Description..."}
                onChange={handleTempChanges}
            />
            <select
                name="status"
                value={editedTask.status}
                onChange={(e) => handleTempChanges(e)}
            >
                {Object.values(TodoStatus).map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <button onClick={() => onSave(editedTask)}>💾 Save</button>
            <button onClick={onCancel}>❌ Cancel</button>
        </div>
    )
}