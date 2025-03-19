import '@testing-library/jest-dom';
import {render, screen, waitFor} from "@testing-library/react";
import TodoContent from "../components/TodoContent.tsx";
import {TodoStatus, TodoTask} from "../types/todoTypes";
import axiosClient from "../api/axiosClient";
import {Dispatch, SetStateAction} from "react";

jest.mock("../api/axiosClient", () => ({
    get: jest.fn(),
}));

describe("TodoContent", () => {
    let setTodosMock: Dispatch<SetStateAction<TodoTask[]>>;
    let mockTodos: TodoTask[];

    beforeEach(() => {
        setTodosMock = jest.fn();
        mockTodos = [
            { id: 1, title: "Task 1", description: "desc", status: TodoStatus.Pending, dueDate: new Date() },
            { id: 2, title: "Task 2", description: "qwerty", status: TodoStatus.Completed, dueDate: new Date()},
        ];
        (axiosClient.get as jest.Mock).mockResolvedValue({ data: mockTodos });
    });

    test("renders the list of todos", () => {
        render(<TodoContent todos={mockTodos} setTodos={setTodosMock} />);
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    test("fetches todos from API on mount", async () => {
        (axiosClient.get as jest.Mock).mockResolvedValue({ data: mockTodos });

        render(<TodoContent todos={[]} setTodos={setTodosMock} />);

        await waitFor(() => {
            expect(axiosClient.get).toHaveBeenCalledWith("/todos");
            expect(setTodosMock).toHaveBeenCalledWith(mockTodos);
        });
    });
});