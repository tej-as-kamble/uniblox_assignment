function ProfileOptions({ setActiveComponent, setShowProfileOptions }) {
  return (
    <div className="options-menu">
      <ul>
        <li onClick={() => setActiveComponent('profile')}>Profile</li>
        <li onClick={() => setActiveComponent('settings')}>Settings</li>
        <li onClick={() => {setActiveComponent('login'); setShowProfileOptions(false);}}>Login Now</li>
      </ul>
    </div>
  );
}
export default ProfileOptions;
