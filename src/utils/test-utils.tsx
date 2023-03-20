import React, { ReactElement } from "react";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const store = createStore(rootReducer);

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options: Omit<RenderOptions, "wrapper"> = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
