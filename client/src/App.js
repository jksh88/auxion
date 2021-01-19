import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
// import Register from './components/register.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Landing from './components/landing.component';
import ListProperty from './components/listProperty.component';
import AuctionPage from './components/auctionPage.component';
import Profile from './components/profile.component';
import ByPropertyBids from './components/byPropertyBids.component';
import MakeABid from './components/makeABid.component';
import Logout from './components/logout.component';

// import Profile from '../profile.component';
// import Logout from './components/logout.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('false');

  const handleAuth = () => {};

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/listproperty" component={ListProperty} />
          <Route
            exact
            path="/properties/:id"
            // render={(props) => <AuctionPage {...props} />}
            component={AuctionPage}
          />
          <Route exact path="/properties/:id/bids" component={ByPropertyBids} />
          <Route exact path="/properties/:id/makeabid" component={MakeABid} />
          <Route exact path="/logout" component={Logout} />

          {/* <Route exact path="/properties/:id/bids" component={BidsPage} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
