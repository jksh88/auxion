import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
// import Register from './components/register.component';
import Login from './components/login.component';
import Landing from './components/landing.component';
// import Profile from '../profile.component';
// import Logout from './components/logout.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          {/* <Route exact path="/register" component={register.component} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
