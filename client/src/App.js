import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import PropertyList from './components/propertyList.component';

function App() {
  return (
    <div className="App">
      <PropertyList />
    </div>
  );
}

export default App;
