import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup');
  }, [location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem('token', data.token); 
        setMessage({ type: 'success', text: 'Login successful!' });
        navigate('/');
      } else {
        setMessage({ type: 'error', text: data.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage({ type: 'success', text: 'Signup successful!' });
        navigate('/');
      } else {
        setMessage({ type: 'error', text: data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="auth-container">
      {isSignUp ? (
        <>
          <h2>Sign Up</h2>
          <br />
          <form onSubmit={handleSignUp} className="auth-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <br/>
          {message.text && (
            <div
              style={{
                color: message.type === 'error' ? 'red' : 'green',
                marginBottom: '10px',
              }}
            >
              {message.text}
            </div>
          )}
          <br />
          <p>
            Already have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <br />
          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <br/>
          {message.text && (
            <div
              style={{
                color: message.type === 'error' ? 'red' : 'green',
                marginBottom: '10px',
              }}
            >
              {message.text}
            </div>
          )}

          <br />
          <p>
            Don't have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
