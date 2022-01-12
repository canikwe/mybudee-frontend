import { authHeaders, BASE_URL } from "../redux/types";

export function appFetch(route: string, cb: (...args: unknown[]) => void) {
  fetch(`${BASE_URL()}/${route}`, { headers: authHeaders() })
    .then((res) => res.json())
    .then(cb)
    .catch(console.error);
}
