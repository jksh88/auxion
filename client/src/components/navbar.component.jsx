import PersonAdd from '@material-ui/icons/PersonAdd';
import Account from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <div
        className="nav-right"
        style={{
          width: '10%',
          display: 'flex',
          justifyContent: 'space-around',
          marginRight: '10%',
        }}
      >
        <Link to="/register">
          <PersonAdd className="nav-items" />
        </Link>
        <Link to="/login">
          <Account className="nav-items" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
