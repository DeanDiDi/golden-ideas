import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
