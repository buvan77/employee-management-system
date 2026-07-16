import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold d-flex align-items-center" to="/dashboard">
        <i className="bi bi-people-fill me-2"></i> EMS Portal
      </Link>
      <div className="d-flex align-items-center">
        <span className="navbar-text text-light me-3">Welcome, **HR Admin**</span>
        <button className="btn btn-outline-danger btn-sm">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;