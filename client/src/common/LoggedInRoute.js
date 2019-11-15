import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={props =>
        authService.isAuthenticated() ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
      {...rest}
    />
  );
};

export default LoggedInRoute;
