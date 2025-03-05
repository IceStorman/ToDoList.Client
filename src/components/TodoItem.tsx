import {TodoTask} from "../types/todoTypes";

interface TodoItemProps {
    task: TodoTask;
    defaultOnClick: () => void;
}

export default function TodoItem({ task, defaultOnClick }: TodoItemProps) {
    return (
        <li onClick={defaultOnClick} style={{ cursor: "pointer" }}>
            <span style={{color: "black"}}>{task.title}</span>
            <span style={{color: "green", fontWeight: "bold", marginLeft: "8px"}}>{task.status}</span>
        </li>
    );
}