import React, { useState, useEffect } from 'react';
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
import AboutPage from './components/aboutPage.component';
import editListingTerms from './components/editListingTerms.component';

// import Profile from '../profile.component';
// import Logout from './components/logout.component';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //I cannot start the state as false because the user might already have token in local storage when he loads the page.
  //App.js only runs when it reloads. This is a situation for example where the user doesn't log out(meaning, the token is still in localStorage), x'es outof th page, goes away, and come back later to reopen the page.
  //But we cannot check local storage before the page is loaded. That's why useEffect needs to be used to check local storage to see if token is there.
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('accessToken'));
  }, []);
  const handleAuth = (valueFromChild) => {
    setIsAuthenticated(valueFromChild); //Q: Can I pass a callback instead?
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} handleAuth={handleAuth} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} handleAuth={handleAuth} />}
          />
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/listproperty" component={ListProperty} />
          <Route exact path="/about" component={AboutPage} />
          <Route
            exact
            path="/properties/:id"
            // render={(props) => <AuctionPage {...props} />}
            component={AuctionPage}
          />
          <Route exact path="/properties/:id/bids" component={ByPropertyBids} />
          <Route exact path="/properties/:id/makeabid" component={MakeABid} />
          <Route
            exact
            path="/properties/:id/edit"
            component={editListingTerms}
          />
          <Route
            exact
            path="/logout"
            render={(props) => <Logout {...props} handleAuth={handleAuth} />}
          />

          {/* <Route exact path="/properties/:id/bids" component={BidsPage} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
//Q: Was it to pass isAuthenticated state to each Route and then to components that it loads that the component= syntax was changed to props => render syntax?
export default App;
