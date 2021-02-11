import { Link } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = ({ isAuthenticated }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/">
          <img className="logo" src="/auxion_logo3.png" alt="logo" />
        </Link>
      </div>
      <div className="list-area">
        <Link to="/listproperty">
          <div className="list-text">
            CLICK &
            <br /> LIST
          </div>
        </Link>
      </div>
      <div className="about">
        <Link to="/about">ABOUT</Link>
      </div>
      {isAuthenticated ? (
        <>
          <div>
            <Link to="/profile">PROFILE</Link>
          </div>
          <div>
            <Link to="/logout">LOGOUT</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/register">REGISTER</Link>
          </div>
          <div>
            <Link to="/Login">LOGIN</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
