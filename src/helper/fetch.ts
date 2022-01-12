import { Dispatch } from "react";
import { authHeaders, BASE_URL, CLEAR_LOADING, THROW_ERROR } from "../redux/types";

type Method = "POST" | "PATCH" | "DELETE" | "GET";

type Config = {
  route: string;
  dispatch: Dispatch<unknown>;
  method?: Method;
  body?: { [key: string]: unknown };
  excludeAuth?: boolean;
};

export function appFetch({ route, body, method, excludeAuth, dispatch }: Config, cb: (...args: unknown[]) => void) {
  const headers = excludeAuth ? { "Content-Type": "application/json" } : authHeaders();

  fetch(`${BASE_URL()}/${route}`, { headers, method, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then(cb)
    .catch((e: Error) => handleError(e, dispatch));
}

function handleError(e: Error, dispatch: Dispatch<unknown>) {
  dispatch(displayError("Something bad happened"));
  dispatch(clearLoading());
  console.error(e);
}

const displayError = (errors: string) => {
  return { type: THROW_ERROR, errors };
};

const clearLoading = () => {
  return { type: CLEAR_LOADING };
};
