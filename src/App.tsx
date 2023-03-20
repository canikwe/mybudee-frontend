import React, { useCallback, useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { testAction, fetchingUser, notifyReminders, clearLoading } from "./redux/actions";
import NavBar from "./components/NavBar";
import { Icon } from "semantic-ui-react";
import { formatReminderToast } from "./helper/functions";
import Footer from "./components/Footer";
import { Routes } from "./routes/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type State = { reminders: any; notifications: any; contacts: any; loading: boolean };

export default function App() {
  const { reminders, contacts, loading } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(loginUser, [dispatch]);

  function loginUser() {
    dispatch(testAction());
    const token = localStorage.getItem("token");
    token ? dispatch(fetchingUser(token)) : dispatch(clearLoading());
  }

  function sendReminderNotifications() {
    reminders.forEach((r: any) => {
      if (r.match && !r.notified && !r.snoozed) {
        alerts(r);
        dispatch(notifyReminders(r));
      }
    });
  }

  const alerts = useCallback(
    (reminder: any) => {
      return reminder.match ? toast(formatReminderToast(reminder, contacts)) : null;
    },
    [contacts]
  );

  useEffect(sendReminderNotifications, [reminders, dispatch, alerts]);

  if (loading) {
    return (
      <div className="App">
        <NavBar />
        <div className="loading">
          <Icon name="spinner" loading size="massive" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <NavBar />
        <ToastContainer />
        <Routes />
        <Footer />
      </div>
    );
  }
}
