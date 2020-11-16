import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './register.component';
import Login from './login.component';
import Profile from './profile.component';
import Logout from './logout.component';
import Home from './home.component';

const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div className="dashboard">
      <Switch>
        <Route
          exact
          path="/register"
          render={(props) => (
            <Register {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
        />
        <Route exact path="/profile" component={Profile} />
        <Route
          exact
          path="logout"
          render={(props) => (
            <Logout {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Dashboard;
