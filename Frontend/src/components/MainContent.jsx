import { useState } from 'react';
import './MainContent.css';
import Nav from './Nav.jsx';
import Cart from './Cart.jsx';
import Order from './Order.jsx';
import Items from './Items.jsx';
import Login from './Login.jsx';


function MainContent() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleSetActive = (component) => {
    if (component !== 'profile') {
      setActiveComponent(component);
    }
  };

  
  const renderComponent = () => {
    switch (activeComponent) {
      case 'cart':
        return <Cart />;
      case 'order':
        return <Order />;
      case 'login':
        return <Login />;
      default:
        return <Items className="main-content-item" />;
    }
  };
  

  return (
    <>
      <Nav setActiveComponent={handleSetActive} />
      <div className="main-content">
        {renderComponent()}
      </div>
    </>
  );
}

export default MainContent;
