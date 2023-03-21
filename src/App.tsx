import React, { useCallback, useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { testAction, fetchingUser, notifyReminders, clearLoading } from "./redux/actions";
import NavBar from "./components/NavBar";
import { Icon } from "semantic-ui-react";
import { formatReminderToast } from "./helper/functions";
import Footer from "./components/Footer";
import { Reminder } from "./_models/Reminder.model";
import { ReduxState } from "./redux/types";
import { Routes } from "./routes/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { reminders, contacts, loading } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  useEffect(loginUser, [dispatch]);

  function loginUser() {
    dispatch(testAction());
    const token = localStorage.getItem("token");
    token ? dispatch(fetchingUser()) : dispatch(clearLoading());
  }

  function sendReminderNotifications() {
    reminders.forEach(sendReminderNotification);
  }

  const alerts = useCallback(
    (reminder: any) => {
      return reminder.match ? toast(formatReminderToast(reminder, contacts)) : null;
    },
    [contacts]
  );

  const sendReminderNotification = useCallback(
    (reminder: Reminder) => {
      if (reminder.match && !reminder.notified && !reminder.snoozed) {
        alerts(reminder);
        dispatch(notifyReminders(reminder));
      }
    },
    [dispatch, alerts]
  );

  useEffect(sendReminderNotifications, [reminders, dispatch, alerts, sendReminderNotification]);

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
