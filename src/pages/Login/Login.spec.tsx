import React from "react";
import Login from "./Login";
import { render } from "utils/test-utils";

describe("Login Page", () => {
  describe("layout", () => {
    it("has a title", () => {
      const { getByText } = render(<Login />);
      const title = getByText("Log In");

      expect(title).toBeDefined();
      expect(title.tagName).toBe("H1");
    });

    it("has input for username", () => {
      const { getByLabelText, getByRole } = render(<Login />);
      const userNameLabel = getByLabelText("Username:");
      const userNameField = getByRole("textbox", { name: "Username:" });

      expect(userNameLabel).toBeDefined();
      expect(userNameField).toBeDefined();
    });

    it("has input for password", () => {
      const { getByLabelText } = render(<Login />);
      const passwordLabel = getByLabelText("Password:");
      const passwordField = getByLabelText(/password/i); // workaround because password inputs do not have an implicit role

      expect(passwordLabel).toBeDefined();
      expect(passwordField).toBeDefined();
    });

    it("has login button", () => {
      const { container } = render(<Login />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Login");
    });

    it("has a signup button", () => {
      const { getByText } = render(<Login />);
      const button = getByText("Sign Up");
      expect(button).toBeInTheDocument();
    });
  });

  describe.each(["Username", "Password"])("validation errors", (fieldName: string) => {
    it(`displays ${fieldName} required validation error when ${fieldName} is empty`, async () => {
      const { getByText, user } = render(<Login />);
      const button = getByText("Login");

      await user.click(button);

      const errorMessage = getByText(`${fieldName} is required`);
      expect(errorMessage).toBeInTheDocument();
    });

    it(`clears ${fieldName} required validation error when ${fieldName} is entered`, async () => {
      const { getByText, getByLabelText, queryByText, getByRole, user } = render(<Login />);
      const button = getByText("Login");
      const passwordField = getByLabelText(/password/i);
      const userNameField = getByRole("textbox", { name: "Username:" });

      await user.click(button);
      await user.type(userNameField, "test-user");
      await user.type(passwordField, "P4ssword");

      const errorMessage = queryByText(`${fieldName} is required`);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    describe("when login is successful", () => {
      it.todo("takes the user to their home page");
    });

    describe("when login is denied", () => {
      it.todo("displays the error message");
    });
  });
});
