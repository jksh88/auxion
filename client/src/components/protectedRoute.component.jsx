import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
