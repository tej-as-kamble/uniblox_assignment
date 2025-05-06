import './Nav.css';
import { useState } from 'react';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ProfileOptions from './ProfileOptions';

function Nav({ setActiveComponent }) {
  const [activeIcon, setActiveIcon] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleIconClick = (icon) => {
    setShowProfileOptions(false);
    setActiveComponent(icon);
    setActiveIcon(icon);
  };

  const handleProfileIconClick = () => {
    setActiveIcon(null);
    setShowProfileOptions(prev => !prev);
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <span className="icon" onClick={() => handleIconClick('home')}>
          <HomeTwoToneIcon sx={{ fontSize: 35 }} />
        </span>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="nav-right">
        <span
          className={`icon ${activeIcon === 'cart' ? 'nav-icon-clicked' : ''}`}
          onClick={() => handleIconClick('cart')}
        >
          <LocalMallTwoToneIcon sx={{ fontSize: 30 }} />
        </span>
        <span
          className={`icon ${activeIcon === 'order' ? 'nav-icon-clicked' : ''}`}
          onClick={() => handleIconClick('order')}
        >
          <CheckCircleTwoToneIcon sx={{ fontSize: 30 }} />
        </span>
        <span
          className={`icon ${showProfileOptions ? 'nav-icon-clicked' : ''}`}
          onClick={handleProfileIconClick}
        >
          <AccountCircleTwoToneIcon sx={{ fontSize: 30 }} />
        </span>
        <span
          className={`icon ${activeIcon === 'admin' ? 'nav-icon-clicked' : ''}`}
          onClick={() => handleIconClick('admin')}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 35, color: activeIcon === 'admin' ? 'red' : 'black' }} />
        </span>
      </div>

      {showProfileOptions && <ProfileOptions setActiveComponent={setActiveComponent} setShowProfileOptions={setShowProfileOptions}/>}
    </div>
  );
}

export default Nav;
