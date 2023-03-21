import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Calendar from "../components/Calendar";
import ContactForm from "../components/ContactForm";
import ContactShow from "../components/ContactShow";
import Login from "../pages/Login/Login";
import ContactCardContainer from "../containers/ContactCardContainer";
import Home from "../containers/Home";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { ReduxState } from "redux/types";
import Homepage from "../containers/Homepage";

enum Paths {
  CALENDAR = "/calendar",
  EDIT_PROFILE = "/profile/edit",
  FRIEND_DETAILS = "/friends/:id",
  FRIENDS = "/friends",
  HOME = "/home",
  LOGIN = "/login",
  NEW_CONTACT = "/contacts/new",
  ROOT = "/",
  SIGN_UP = "/signup",
}

export function Routes() {
  const { user, reminders, contacts } = useSelector((state: ReduxState) => state);

  return (
    <main className="main-content">
      <Switch>
        <Route exact path={Paths.ROOT} render={() => (isEmpty(user) ? <Redirect to={Paths.LOGIN} /> : <Homepage />)} />
        <Route exact path={Paths.LOGIN} render={() => (isEmpty(user) ? <Login /> : <Redirect to={Paths.ROOT} />)} />
        <Route
          exact
          path={Paths.NEW_CONTACT}
          render={() => (!isEmpty(user) ? <ContactForm /> : <Redirect to={Paths.LOGIN} />)}
        />
        {/* <Route
          exact
          path={Paths.SIGN_UP}
          render={(routeProps) =>
            isEmpty(user) ? <UserForm title="Sign Up Here" {...routeProps} /> : <Redirect to={Paths.ROOT} />
          }
        />

        <Route
          exact
          path={Paths.EDIT_PROFILE}
          render={(routeProps) =>
            !isEmpty(user) ? <UserForm title="Account Settings" {...routeProps} /> : <Redirect to={Paths.LOGIN} />
          }
        /> */}

        <Route
          exact
          path={Paths.CALENDAR}
          render={() => (!isEmpty(user) ? <Calendar /> : <Redirect to={Paths.LOGIN} />)}
        />

        <Route
          exact
          path={Paths.FRIENDS}
          render={() => (!isEmpty(user) ? <ContactCardContainer /> : <Redirect to={Paths.LOGIN} />)}
        />

        <Route
          exact
          path={Paths.FRIEND_DETAILS}
          render={(props) => {
            const friendId = parseInt(props.match.params.id);
            const friend = contacts.find((c: any) => c.id === friendId);
            const filteredReminders = reminders.filter((r: any) => r.contact_id === friendId);

            return !isEmpty(user) && friend ? (
              <div className="contact-details">
                <ContactShow contact={friend} reminders={filteredReminders} />
              </div>
            ) : (
              <Redirect to={Paths.LOGIN} />
            );
          }}
        />
        <Route exact path={Paths.HOME} component={Home} />
        <Redirect from="*" to={Paths.ROOT} />
      </Switch>
    </main>
  );
}
