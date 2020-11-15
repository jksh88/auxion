import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import './header.styles.css';

const Header = ({ isAuthenticated }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        LOGO TO COME
      </Link>
      <div className="options">
        {isAuthenticated ? (
          <div className="option">
            <div onClick={() => auth.logout()}>LOG OUT</div>
            <Link to="/profile">MY PROFILE</Link>
          </div>
        ) : (
          <div className="option">
            <Link to="/register">REGISTER</Link>
            <Link to="/login">LOG IN</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
