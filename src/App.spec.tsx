import React from "react";
import { render } from "utils/test-utils";
import App from "./App";

it("renders welcome message", () => {
  const { getByText } = render(<App />);
  expect(getByText("myNetwork")).toBeInTheDocument();
});
