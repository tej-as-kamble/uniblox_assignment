import { useNavigate } from 'react-router-dom';

function ProfileOptions({ setShowProfileOptions }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowProfileOptions(false);
    navigate('/login');
  };

  return (
    <div className="options-menu">
      <ul>
        <li onClick={() => { setShowProfileOptions(false); navigate('/profile'); }}>Profile</li>
        <li onClick={() => { setShowProfileOptions(false); navigate('/settings'); }}>Settings</li>

        {token ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={() => { setShowProfileOptions(false); navigate('/login'); }}>Login Now</li>
        )}
      </ul>
    </div>
  );
}

export default ProfileOptions;
