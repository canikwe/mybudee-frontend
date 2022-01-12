import {
  FETCHED_USER,
  LOADING_USER,
  UPDATING_USER,
  THROW_ERROR,
  CLEAR_ERROR,
  LOGOUT_USER,
  CLEAR_LOADING,
} from "../types.ts";
import { appFetch } from "../../helper/fetch";

const fetchingUser = () => {
  return (dispatch) => {
    dispatch(loadingUser);

    appFetch({ route: "profile", dispatch }, (data) => {
      if (!!data.user.id) {
        dispatch(fetchedUser(data));
      } else {
        dispatch(clearLoading());
      }
    });
  };
};

const addingUser = (user) => {
  return (dispatch) => {
    dispatch(loadingUser);

    appFetch({ route: "users", method: "POST", body: { user }, excludeAuth: true, dispatch }, (data) => {
      if (data.authenticated) {
        dispatch(fetchedUser(data));
        localStorage.setItem("token", data.token);
      } else {
        dispatch(displayError(data));
        dispatch(clearLoading());
      }
    });
  };
};

const authenticatingUser = (params) => {
  return (dispatch) => {
    dispatch(loadingUser);

    appFetch({ route: "login", method: "POST", body: params, excludeAuth: true, dispatch }, (data) => {
      if (data.authenticated) {
        dispatch(fetchedUser(data));
        localStorage.setItem("token", data.token);
      } else {
        dispatch(displayError(data.message));
        dispatch(clearLoading());
      }
    });
  };
};

const updatingUser = (user, id) => {
  return (dispatch) => {
    appFetch({ route: `users/${id}`, method: "PATCH", body: user, dispatch }, (data) => {
      dispatch(updateUser(data));
    });
  };
};

const fetchedUser = (payload) => {
  return { type: FETCHED_USER, payload };
};

const loadingUser = () => {
  return { type: LOADING_USER };
};

const clearLoading = () => {
  return { type: CLEAR_LOADING };
};

const displayError = (errors) => {
  return { type: THROW_ERROR, errors };
};

const clearError = () => {
  return { type: CLEAR_ERROR };
};

const updateUser = (data) => {
  return { type: UPDATING_USER, data };
};

const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export { logoutUser, updatingUser, clearError, authenticatingUser, addingUser, fetchingUser, clearLoading };
