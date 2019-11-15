import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "common/Header";
import RentalList from "components/rental/RentalList";
import RentalDetail from "components/rental/RentalDetail";
import Login from "components/login/Login";
import Register from "components/register/Register";
import { checkAuthState } from "redux/actions/auth-actions";
import ProtectedRoute from "common/ProtectedRoute";
import LoggedInRoute from "common/LoggedInRoute";

import "App.css";

class App extends React.Component {
  componentDidMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    this.props.store.dispatch(checkAuthState());
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={RentalList} />
            <ProtectedRoute
              path="/rentals/:id"
              exact
              component={RentalDetail}
            />
            <Route path="/login" exact component={Login} />
            <LoggedInRoute path="/register" exact component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
