import { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  // Added state for the user's name
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', { email, password });
    // add login logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signup with:', { name, email, password });
    // add signup logic here
  };

  return (
    <div className="auth-container">
      {isSignUp ? (
        <>
          <h2>Sign Up</h2>
          <br/>
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
          <p>
            Already have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsSignUp(false)}>
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <br/>
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
          <p>
            Don't have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsSignUp(true)}>
              Sign Up
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
