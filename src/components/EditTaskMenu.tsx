import React, {Dispatch, SetStateAction} from "react";
import "../styles/EditTaskMenu.scss"
import {GetTodoStatusByInt, TodoStatus, TodoTask} from "../types/todoTypes.ts";
import {Dialog, DialogTitle} from "@headlessui/react";
import axiosClient from "../api/axiosClient.ts";

interface EditTaskMenuProps {
    taskToEdit: TodoTask,
    setTaskToEdit: Dispatch<SetStateAction<TodoTask | null>>,
    setTodos: Dispatch<SetStateAction<TodoTask[]>>,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditTaskMenu({taskToEdit, setTaskToEdit, setTodos, isOpen, setIsOpen}: EditTaskMenuProps) {
    const handleTempChanges = (e: React.ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTaskToEdit({ ...taskToEdit, [e.target.name]: e.target.value });
    };

    function onCancel() {
        setIsOpen(false);
    }

    async function onSave(editedTask: TodoTask) {
        const todoStatuses = Object.values(TodoStatus).map((status, index) => ({
            index: index,
            status: status
        }));

        await axiosClient.put("/todos/update/" + editedTask.id, {
                title: editedTask.title,
                description: editedTask.description,
                status: todoStatuses.find((item) => item.status == editedTask.status)?.index
        });
        axiosClient.get<TodoTask[]>("/todos").then((response) => setTodos(response.data));
        setIsOpen(false);
    }

    return(
        <div className="editWindow">
            <Dialog open={isOpen} onClose={onCancel} className="editWindowOverlay">
                <div className="editWindowContent">
                    <DialogTitle>Edit Task</DialogTitle>
                    <input
                        type="text"
                        name="title"
                        value={taskToEdit.title}
                        placeholder={"Title..."}
                        onChange={handleTempChanges}
                    />
                    <textarea
                        name="description"
                        value={taskToEdit.description}
                        placeholder={"Description..."}
                        onChange={handleTempChanges}
                    />
                    <select
                        name="status"
                        value={GetTodoStatusByInt(Number(taskToEdit.status))}
                        onChange={(e) => handleTempChanges(e)}
                    >
                        {Object.values(TodoStatus).map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <button onClick={() => onSave(taskToEdit)}>💾 Save</button>
                    <button onClick={onCancel}>❌ Cancel</button>
                </div>
            </Dialog>
        </div>
    )
}