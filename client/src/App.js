import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "common/Header";
import RentalList from "components/rental/RentalList";
import RentalDetail from "components/rental/RentalDetail";
import Login from "components/login/Login";
import Register from "components/register/Register";

import "App.css";

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={RentalList} />
          <Route path="/rentals/:id" exact component={RentalDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
