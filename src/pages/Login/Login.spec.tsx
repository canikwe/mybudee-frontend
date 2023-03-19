import React from "react";
import Login from "../../components/Login";
import { render } from "utils/test-utils";

describe("Login", () => {
  describe("Required Fields", () => {
    it("should display the username field", () => {
      const { getByLabelText, getByRole } = render(<Login />);
      const userNameLabel = getByLabelText("Username:");
      const userNameField = getByRole("textbox", { name: "Username:" });

      expect(userNameLabel).toBeDefined();
      expect(userNameField).toBeDefined();
    });

    it("should display the password field", () => {
      const { getByLabelText } = render(<Login />);
      const passwordLabel = getByLabelText("Password:");
      const passwordField = getByLabelText(/password/i); // workaround because password inputs do not have an implicit role

      expect(passwordLabel).toBeDefined();
      expect(passwordField).toBeDefined();
    });
  });
});
