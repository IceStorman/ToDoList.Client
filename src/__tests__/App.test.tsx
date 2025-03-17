import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"

test("Renders the main page", () => {
    const { getByText } = render(<App />);
    expect(getByText("Mocked DatePicker")).toBeInTheDocument();
});