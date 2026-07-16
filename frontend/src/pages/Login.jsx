import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    EmployeeService.login(username, password)
      .then(() => {
        setLoading(false);
        onLoginSuccess(); // Update authentication state flag globally
        navigate('/dashboard'); // Direct to landing workspace panels
      })
      .catch((err) => {
        console.error("Login verification breakdown:", err);
        setError("Invalid username or password credentials. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '80vh' }}>
      <div className="card shadow border-0 p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark m-0">EMS Portal</h2>
          <p className="text-muted small">Administrative Secure Gateway</p>
        </div>

        {error && (
          <div className="alert alert-danger small shadow-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-semibold py-2 shadow-sm"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;