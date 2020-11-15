import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import auth from './utils/auth';
import Header from './components/header.component';
import Dashboard from './components/dashboard.component';

import PropertyList from './components/propertyList.component';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
        <PropertyList />
      </BrowserRouter>
    </div>
  );
}

export default App;
