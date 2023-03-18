import React from "react";
import Login from "../../components/Login";

describe("Login", () => {
  describe("Initialization", () => {
    it("should render", () => {
      expect(<Login />).toBeDefined();
    });
  });
});
