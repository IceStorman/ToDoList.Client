import {TodoTask} from "../types/todoTypes";
import "../styles/TodoItem.scss"

interface TodoItemProps {
    task: TodoTask;
    defaultOnClick: () => void;
}

export default function TodoItem({ task, defaultOnClick }: TodoItemProps) {
    return (
        <div className="todoItem" onClick={defaultOnClick} style={{ cursor: "pointer" }}>
            <span style={{color: "gray"}}>{task.title}</span>
            <span style={{color: "green", fontWeight: "bold", marginLeft: "8px"}}>{task.status}</span>
        </div>
    );
}