import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "./Login";

describe("Login Component", () => {

  test("renders all UI elements", () => {
    render(<Login />);

    // Check for email input
    expect(screen.getByLabelText(/email or phone/i)).toBeInTheDocument();

    // Check for password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check for login button
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Check for 'Forget password' and 'Create account' links
    expect(screen.getByText(/forget password/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  test("displays error messages when submitting with empty fields", () => {
    render(<Login />);

    // Click the login button without entering email or password
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Check for error messages
    expect(screen.getByText(/error! email is required./i)).toBeInTheDocument();
    expect(screen.getByText(/error! password is empty!/i)).toBeInTheDocument();
  });

});
