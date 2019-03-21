import React from "react";
import { Route, Redirect } from "react-router-dom";
import commonUtilsFunc from "../../utils/common";

function AuthenticatedRoute({ WrappedComponent, authenticated, ...rest }) {
  if (!authenticated) {
    commonUtilsFunc.handleLogout();
  }
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <WrappedComponent {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default AuthenticatedRoute;
