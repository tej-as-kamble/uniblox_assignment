import { useNavigate } from 'react-router-dom';
import './Nav.css';
import { useState } from 'react';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ProfileOptions from './ProfileOptions';

function Nav() {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const email = localStorage.getItem('email');

  const handleIconClick = (path) => {
    setShowProfileOptions(false);
    setActiveIcon(path);
    navigate(path === 'home' ? '/' : `/${path}`);
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
        <span>
          <button
            className={`fancy-btn ${activeIcon === 'discount' ? 'fancy-btn-active' : ''}`}
            onClick={() => handleIconClick('discount')}
          >
            Get Discount
          </button>
        </span>
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
        {email==='admin@gmail.com' ? <span
          className={`icon ${activeIcon === 'admin' ? 'nav-icon-clicked' : ''}`}
          onClick={() => handleIconClick('admin')}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 35, color: activeIcon === 'admin' ? 'red' : 'black' }} />
        </span> : <></>}
      </div>

      {showProfileOptions && (
        <ProfileOptions
          setShowProfileOptions={setShowProfileOptions}
        />
      )}
    </div>
  );
}

export default Nav;
