import { useState } from 'react';
import './navbar.scss';
import { Avatar } from '@mui/material';

const Navbar = () => {
  const [adminData, setAdminData] = useState({
    name: 'Antonio',
    lastName: 'Piatti',
    image:
      'https://i.pinimg.com/550x/fb/df/1a/fbdf1a5addb8b1be64a7cc04c2be6c36.jpg',
  });

  return (
    <div className="navbar">
      <div className="logo">
        <Avatar src={adminData.image} sx={{ width: 42, height: 42 }} />
        <span>PediClick Admin</span>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className="user">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${adminData.name}+${adminData.lastName}&rounded=true`}
            sx={{ width: 32, height: 32 }}
          />
          <span>{adminData.name}</span>
        </div>
        {/* <img src="/settings.svg" alt="" className="icon" /> */}
      </div>
    </div>
  );
};

export default Navbar;
