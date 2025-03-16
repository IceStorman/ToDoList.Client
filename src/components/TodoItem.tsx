import {GetTodoStatusByInt, TodoStatus, TodoTask} from "../types/todoTypes";
import "../styles/TodoItem.scss";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosClient from "../api/axiosClient.ts";

interface TodoItemProps{
    task: TodoTask,
    setTodos: Dispatch<SetStateAction<TodoTask[]>>,
    onEditRequested: () => void
}

export default function TodoItem({ task, setTodos, onEditRequested }: TodoItemProps) {
    const onDelete = async () => {
        await axiosClient.delete("/todos/delete/" + task.id);
        axiosClient.get<TodoTask[]>("/todos").then((response) => setTodos(response.data));
    }

    const onTaskStatusUpdated = async (e: ChangeEvent<HTMLSelectElement>) => {
        const todoStatuses = Object.values(TodoStatus).map((status, index) => ({
            index: index,
            status: status
        }));
        const newStatusProps = todoStatuses.find((item) => item.status == e.target.value as TodoStatus);
        const newStatusIndex = newStatusProps?.index;

        if (newStatusProps) {
            await axiosClient.put("/todos/updateStatus/" + task.id, {title: "", description: "", status: newStatusIndex});
            axiosClient.get<TodoTask[]>("/todos").then((response) => setTodos(response.data));
        }
    }

    const onTaskDueDateUpdated = async (newDate: Date) => {
        await axiosClient.put("/todos/updateDueDate/" + task.id, {title: "", description: "", status: 0, dueDate: newDate});
        axiosClient.get<TodoTask[]>("/todos").then((response) => setTodos(response.data));
    }

    return (
        <div className="todoItem">
            <div className="todoText">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </div>
            <div className="interactButtons">
                <div>
                    <DatePicker className="datePicker"
                                selected={task.dueDate}
                                onChange={(date) => onTaskDueDateUpdated(date as Date)}
                                minDate={new Date()}
                    />
                </div>
                <select
                    value={GetTodoStatusByInt(Number(task.status))}
                    onChange={(e) => onTaskStatusUpdated(e)}
                >
                    {Object.values(TodoStatus).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button onClick={() => onDelete()} className="manipulateTaskButton">
                    ❌
                </button>
                <button onClick={() => onEditRequested()} className="manipulateTaskButton">
                    ✏️
                </button>
            </div>
        </div>
    );
}