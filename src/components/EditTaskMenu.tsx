import React, { useState } from "react";
import "../styles/EditTaskMenu.scss"
import {TodoTask} from "../types/todoTypes.ts";

interface TaskEditWindowProps {
    task: TodoTask;
    onSave: (updatedTask: TodoTask) => void;
    onCancel: () => void;
}

export default function EditTaskMenu({ task, onSave, onCancel }: TaskEditWindowProps) {
    const [editedTask, setEditedTask] = useState<TodoTask>(task);

    const handleTempChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    return(
        <div className="editWindow">
            <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleTempChanges}
            />
            <textarea
                name="description"
                value={editedTask.description}
                onChange={handleTempChanges}
            />
            <button onClick={() => onSave(editedTask)}>💾 Save</button>
            <button onClick={onCancel}>❌ Cancel</button>
        </div>
    )
}