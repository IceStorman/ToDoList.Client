import React, {Dispatch, SetStateAction, useState} from "react";
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
    const [titleValidation, setTitleValidation] = useState<boolean>(false);
    const [descriptionValidation, setDescriptionValidation] = useState<boolean>(false);

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

        setTitleValidation(false);
        setDescriptionValidation(false);
        let canSave = true;

        if(!isTitleValid(editedTask)) {
            setTitleValidation(true);
            canSave = false;
        }
        if(!isDescriptionValid(editedTask)) {
            setDescriptionValidation(true);
            canSave = false;
        }
        if(!canSave){
            return;
        }

        await axiosClient.put("/todos/update/" + editedTask.id, {
                title: editedTask.title.trimStart(),
                description: editedTask.description.trimStart(),
                status: todoStatuses.find((item) => item.status == editedTask.status)?.index
        });
        axiosClient.get<TodoTask[]>("/todos").then((response) => setTodos(response.data));
        setIsOpen(false);
    }

    function isTitleValid(task: TodoTask){
        return task.title.trim() && task.title.length <= 64;
    }

    function isDescriptionValid(task: TodoTask){
        return task.description.length <= 256;
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
                    {titleValidation && (
                        <p className="validationMessage">*The title must contain from 1 to 64 symbols</p>
                    )}

                    <textarea
                        name="description"
                        value={taskToEdit.description}
                        placeholder={"Description..."}
                        onChange={handleTempChanges}
                    />
                    {descriptionValidation && (
                        <p className="validationMessage">*The description must contain maximum 256 symbols</p>
                    )}
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