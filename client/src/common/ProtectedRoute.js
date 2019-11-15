import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
