import '@testing-library/jest-dom'
import {  render, screen, fireEvent, waitFor } from "@testing-library/react"
import CreateTodoItemInterface from "../components/CreateTodoItemInterface.tsx";
import axiosClient from "../api/axiosClient";

jest.mock("../api/axiosClient");

describe("CreateTodoItemInterface", () => {
    let setTodosMock: jest.Mock;

    beforeEach(() => {
        setTodosMock = jest.fn();
        render(<CreateTodoItemInterface setTodos={setTodosMock}/>);
    });

    test("renders input field and add button", () => {
        expect(screen.getByPlaceholderText("New task...")).toBeInTheDocument();
        expect(screen.getByText("+ Add New Task")).toBeInTheDocument();
    });

    test("updates input value when typing", () => {
        const input = screen.getByPlaceholderText("New task...") as HTMLInputElement;
        fireEvent.change(input, {target: {value: "New Task"}});
        expect(input.value).toBe("New Task");
    });

    test("shows validation message when input is empty", () => {
        fireEvent.click(screen.getByText("+ Add New Task"));
        expect(screen.getByText("*The title must contain from 1 to 64 symbols")).toBeInTheDocument();
    });

    test("shows validation message when input exceeds 64 characters", () => {
        const input = screen.getByPlaceholderText("New task...");
        fireEvent.change(input, {target: {value: "a".repeat(65)}});
        fireEvent.click(screen.getByText("+ Add New Task"));
        expect(screen.getByText("*The title must contain from 1 to 64 symbols")).toBeInTheDocument();
    });

    test("calls API and updates state when valid input is provided", async () => {
        const input = screen.getByPlaceholderText("New task...");
        fireEvent.change(input, {target: {value: "Valid Task"}});

        (axiosClient.post as jest.Mock).mockResolvedValue({
            data: {id: "1", title: "Valid Task", completed: false},
        });

        fireEvent.click(screen.getByText("+ Add New Task"));

        await waitFor(() => {
            expect(axiosClient.post).toHaveBeenCalledWith("/todos/create", {title: "Valid Task"});
            expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function));
        });
    });
});