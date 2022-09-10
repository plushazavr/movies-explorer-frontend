import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  const { isLoggedIn } = props;
  return (
    <Route>
      {
        () => isLoggedIn ? <Component {...props} /> : <Redirect to="/"/>
      }
    </Route>
  )
}