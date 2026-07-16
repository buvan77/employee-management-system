import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import Login from './pages/Login';
import EmployeeService from './services/EmployeeService';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Check local storage state dynamically to see if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    EmployeeService.logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Main Secure Header Panel Top */}
        <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm justify-content-between">
          <span className="navbar-brand mb-0 h1 fw-bold tracking-tight text-white">EMS Portal</span>
          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-light opacity-75 small">Welcome, <strong>HR Admin</strong></span>
              <button onClick={handleLogout} className="btn btn-sm btn-outline-danger font-semibold px-3">
                Logout
              </button>
            </div>
          )}
        </nav>

        <div className="container-fluid flex-grow-1 d-flex p-0">
          {/* Side Navigation Control Dashboard Drawer */}
          {isAuthenticated && (
            <div className="bg-dark text-white p-4 d-flex flex-column gap-2 shadow-lg" style={{ width: '240px' }}>
              <Link to="/dashboard" className="btn btn-outline-light text-start border-0 py-2.5 px-3 fw-semibold">
                Dashboard
              </Link>
              <Link to="/employees" className="btn btn-outline-light text-start border-0 py-2.5 px-3 fw-semibold">
                Employees
              </Link>
              <Link to="/employees/add" className="btn btn-outline-light text-start border-0 py-2.5 px-3 fw-semibold">
                Add Employee
              </Link>
              <hr className="opacity-25 my-3" />
              <div className="mt-auto text-muted small px-3">v1.1.0 Secured</div>
            </div>
          )}

          {/* Core Content Switching Routing Engine Node Grid */}
          <div className="flex-grow-1 p-4">
            <Routes>
              {/* Public Authenticating Auth Node Gateway Link */}
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />} 
              />

              {/* Secure Intercept Path Proxies */}
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/employees" 
                element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/employees/add" 
                element={isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/employees/edit/:id" 
                element={isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />} 
              />

              {/* Root Fallback Catch Routine Anchor Redirect */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;