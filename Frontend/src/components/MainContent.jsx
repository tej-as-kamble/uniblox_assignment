import { Routes, Route, Navigate } from 'react-router-dom';
import './MainContent.css';
import Nav from './Nav.jsx';
import Cart from './Cart.jsx';
import Order from './Order.jsx';
import Items from './Items.jsx';
import Login from './Login.jsx';
import GetDiscount from './GetDiscount.jsx';
import Admin from './Admin.jsx';

function MainContent() {
  return (
    <>
      <Nav />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/profile" element={<p>Profile</p>} />
          <Route path="/settings" element={<p>Settings</p>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/discount" element={<GetDiscount />} />

          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </>
  );
}

export default MainContent;
