import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.css';

const Header = ({ isAuthenticated }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        LOGO TO COME
      </Link>
      <div className="options">
        <Link to="/info" className="option">
          HOW IT WORKS
        </Link>
      </div>
    </div>
  );
};

export default Header;
