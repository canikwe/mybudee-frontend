import React, { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { testAction, fetchingUser, notifyReminders, clearLoading } from "./redux/actions";
import NavBar from "./components/NavBar";
import { Icon } from "semantic-ui-react";
import { formatReminderToast } from "./helper/functions";
import Footer from "./components/Footer";
import { Routes } from "./Routes";
import { Reminder } from "./_models/Reminder.model";
import { ReduxState } from "./redux/types";

export default function App() {
  const { reminders, contacts, loading } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();
  useEffect(loginUser, []);
  useEffect(sendReminderNotifications, [reminders]);

  function loginUser() {
    dispatch(testAction());
    const token = localStorage.getItem("token");
    token ? dispatch(fetchingUser()) : dispatch(clearLoading());
  }

  function sendReminderNotifications() {
    reminders.forEach(sendReminderNotification);
  }

  function sendReminderNotification(reminder: Reminder) {
    if (reminder.match && !reminder.notified && !reminder.snoozed) {
      alerts(reminder);
      dispatch(notifyReminders(reminder));
    }
  }

  function alerts(reminder: Reminder): void | null {
    return reminder.match ? console.log(formatReminderToast(reminder, contacts)) : null;
  }

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
        <Routes />
        <Footer />
      </div>
    );
  }
}
