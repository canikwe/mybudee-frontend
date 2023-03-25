import React, { ReactElement } from "react";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup.js";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const store = createStore(rootReducer);

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper"> = {}
): RenderResult & { user: UserEvent } => {
  const user = userEvent.setup();
  const renderResult = render(ui, { wrapper: AllProviders, ...options });
  return { ...renderResult, user };
};

export * from "@testing-library/react";
export { customRender as render };
