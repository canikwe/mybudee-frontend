import React, { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { testAction, fetchingUser, notifyReminders, clearLoading } from "./redux/actions";
import NavBar from "./components/NavBar";
import { Icon } from "semantic-ui-react";
import { formatReminderToast } from "./helper/functions";
import Footer from "./components/Footer";
import { Routes } from "./Routes";

type State = { reminders: any; notifications: any; contacts: any; loading: boolean };

export default function App() {
  const { reminders, contacts, loading } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testAction());
    const token = localStorage.getItem("token");
    token ? dispatch(fetchingUser(token)) : dispatch(clearLoading());
  }, []);

  useEffect(() => {
    reminders.forEach((r: any) => {
      if (r.match && !r.notified && !r.snoozed) {
        alerts(r);
        dispatch(notifyReminders(r));
      }
    });
  }, [reminders]);

  const alerts = (reminder: any) => {
    return reminder.match ? console.log(formatReminderToast(reminder, contacts)) : null;
  };

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
