import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './MainContent.css';
import Nav from './Nav.jsx';
import Cart from './Cart.jsx';
import Order from './Order.jsx';
import Items from './Items.jsx';
import Login from './Login.jsx';
import GetDiscount from './GetDiscount.jsx';
import Admin from './Admin.jsx';

function MainContent() {
  const token = localStorage.getItem('token');
  console.log(token);
  const location = useLocation();

  const ProtectedRoute = ({ element }) => {
    if (!token) {
      alert('Please login first!');
      return <Navigate to="/login" />;
    }
    return element;
  };

  const RedirectIfLoggedIn = ({ element }) => {
    if (token && (location.pathname === '/login' || location.pathname === '/signup')) {
      return <Navigate to="/" />;
    }
    return element;
  };

  return (
    <>
      <Nav />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
          <Route path="/signup" element={<RedirectIfLoggedIn element={<Login />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/discount" element={<ProtectedRoute element={<GetDiscount />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<p>Profile</p>} />} />
          <Route path="/settings" element={<ProtectedRoute element={<p>Settings</p>} />} />
          <Route path="/" element={<ProtectedRoute element={<Items />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default MainContent;
