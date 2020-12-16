import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';

import PropertyList from './components/propertyList.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <PropertyList />
      </BrowserRouter>
    </div>
  );
}

export default App;
