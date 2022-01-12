import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Calendar from "./components/Calendar";
import ContactForm from "./components/ContactForm";
import ContactShow from "./components/ContactShow";
import Login from "./components/Login";
import UserForm from "./components/UserForm/user-form.component";
import ContactCardContainer from "./containers/ContactCardContainer";
import Home from "./containers/Home";
import Homepage from "./containers/Homepage";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { User } from "./components/UserForm/user.type";

type State = { user: User; reminders: any; notifications: any; contacts: any; loading: boolean };

export function Routes() {
  const { user, reminders, contacts } = useSelector((state: State) => state);

  return (
    <main className="main-content">
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isEmpty(user) ? <Redirect to="/login" /> : <Homepage />;
          }}
        />

        <Route
          exact
          path="/login"
          render={() => {
            return isEmpty(user) ? <Login /> : <Redirect to="/" />;
          }}
        />

        <Route
          exact
          path="/contacts/new"
          render={() => {
            return !isEmpty(user) ? <ContactForm /> : <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/signup"
          render={(routeProps) => {
            return isEmpty(user) ? <UserForm title="Sign Up Here" {...routeProps} /> : <Redirect to="/" />;
          }}
        />

        <Route
          exact
          path="/profile/edit"
          render={(routeProps) => {
            return !isEmpty(user) ? <UserForm title="Account Settings" {...routeProps} /> : <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/calendar"
          render={() => {
            return !isEmpty(user) ? <Calendar /> : <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/friends"
          render={() => {
            return !isEmpty(user) ? <ContactCardContainer /> : <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/friends/:id"
          render={(props) => {
            const friendId = parseInt(props.match.params.id);
            const friend = contacts.find((c: any) => c.id === friendId);
            const filteredReminders = reminders.filter((r: any) => r.contact_id === friendId);

            return !isEmpty(user) && friend ? (
              <div className="contact-details">
                <ContactShow contact={friend} reminders={filteredReminders} />
              </div>
            ) : (
              <Redirect to="/login" />
            );
          }}
        />

        <Route exact path="/home" component={Home} />

        <Redirect from="*" to="/" />
      </Switch>
    </main>
  );
}
