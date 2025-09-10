import { useState } from 'react';

function AuthWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="auth-links">
        <span>Welcome, Pet Owner!</span>
        <button 
          onClick={handleLogout}
          className="btn btn-link p-0 ms-2"
          style={{ color: '#ffffff', textDecoration: 'underline', fontSize: '0.75rem' }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-links">
      <button 
        onClick={handleLogin}
        className="btn btn-link p-0"
        style={{ color: '#ffffff', textDecoration: 'underline', fontSize: '0.75rem' }}
      >
        Login
      </button>
      <span style={{ color: '#ffffff', margin: '0 0.2rem' }}> / </span>
      <button 
        onClick={handleLogin}
        className="btn btn-link p-0"
        style={{ color: '#ffffff', textDecoration: 'underline', fontSize: '0.75rem' }}
      >
        Register
      </button>
    </div>
  );
}

export default AuthWrapper;
