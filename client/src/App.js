import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "common/Header";
import RentalList from "components/rental/RentalList";
import RentalDetail from "components/rental/RentalDetail";

import "App.css";

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={RentalList} />
          <Route path="/rentals/:id" exact component={RentalDetail} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
