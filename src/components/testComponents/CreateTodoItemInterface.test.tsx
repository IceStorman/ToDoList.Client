import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import CreateTodoItemInterface from "../CreateTodoItemInterface";
import axiosClient from "../../api/axiosClient";
import {TodoStatus, TodoTask} from "../../types/todoTypes";
import { jest } from "@jest/globals";

jest.mock("../../api/axiosClient");

describe("CreateTodoItemInterface", () => {
    let setTodos: jest.Mock;

    beforeEach(() => {
        setTodos = jest.fn();
    });

    it("should render input and button", () => {
        render(<CreateTodoItemInterface setTodos={setTodos} />);

        expect(screen.getByPlaceholderText("New task...")).toBeInTheDocument();
        expect(screen.getByText("+ Add New Task")).toBeInTheDocument();
    });

    it("should update input value on change", () => {
        render(<CreateTodoItemInterface setTodos={setTodos} />);

        const input = screen.getByPlaceholderText("New task...") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Test Todo" } });
        expect(input.value).toBe("Test Todo");
    });

    it("should show validation message when input is empty or too long", () => {
        render(<CreateTodoItemInterface setTodos={setTodos} />);

        const input = screen.getByPlaceholderText("New task...") as HTMLInputElement;
        const button = screen.getByText("+ Add New Task");

        fireEvent.click(button);
        expect(screen.getByText("*The title must contain from 1 to 64 symbols")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "a".repeat(65) } });
        fireEvent.click(button);
        expect(screen.getByText("*The title must contain from 1 to 64 symbols")).toBeInTheDocument();
    });

    it("should call setTodos when new todo is successfully added", async () => {
        render(<CreateTodoItemInterface setTodos={setTodos} />);

        const input = screen.getByPlaceholderText("New task...") as HTMLInputElement;
        const button = screen.getByText("+ Add New Task");

        const mockTodo: TodoTask = { id: 1, title: "New Task", description: "", dueDate: new Date(), status: TodoStatus.Pending };
        (axiosClient.post as jest.MockedFunction<typeof axiosClient.post>).mockResolvedValueOnce({ data: mockTodo });

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(setTodos).toHaveBeenCalledWith(expect.any(Function));
            expect(setTodos).toHaveBeenCalledWith((prev: TodoTask[]) => [...prev, mockTodo]);
        });

        expect(input.value).toBe("");
    });

    it("should not call setTodos if API call fails", async () => {
        render(<CreateTodoItemInterface setTodos={setTodos} />);

        const input = screen.getByPlaceholderText("New task...") as HTMLInputElement;
        const button = screen.getByText("+ Add New Task");

        (axiosClient.post as jest.MockedFunction<typeof axiosClient.post>).mockRejectedValueOnce(new Error("Failed to add task"));

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(setTodos).not.toHaveBeenCalled();
        });
    });
});