import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <div
      className="Navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        className="nav-left"
        style={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Link to="/">
          <h1 className="logo">LOGO</h1>
        </Link>
      </div>
      <div className="nav-center">
        <Link to="/listproperty">
          <button className="list-button">LIST MY PROPERTY</button>
        </Link>
      </div>
      <div className="about">
        <Link to="/about">ABOUT</Link>
      </div>
      <div
        className="nav-right"
        style={{
          width: '10%',
          display: 'flex',
          justifyContent: 'space-around',
          marginRight: '10%',
        }}
      >
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">PROFILE</Link>
            </li>
            <li>
              <Link to="/logout">LOGOUT</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">REGISTER</Link>
            </li>
            <li>
              <Link to="/Login">LOGIN</Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
