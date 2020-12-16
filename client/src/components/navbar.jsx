import Bell from '@material-ui/icons/NotificationsNone';
import Gear from '@material-ui/icons/Settings';
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
        <Link href="/">
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
        <Bell className="nav-items" />
        <Gear className="nav-items" />
        <Account className="nav-items" />
      </div>
    </div>
  );
};

export default Navbar;
