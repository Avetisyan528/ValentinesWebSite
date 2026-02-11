import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders ready journey prompt", () => {
    render(<App />);
    expect(screen.getByText(/are you ready for a lovely journey\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^no$/i })).toBeInTheDocument();
});

test("yes advances to next component", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /yes/i }));
    expect(screen.queryByText(/are you ready for a lovely journey\?/i)).not.toBeInTheDocument();
});
