import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 d-flex flex-column shadow-sm" style={{ width: '240px', minHeight: 'calc(100vh - 56px)' }}>
      <ul className="nav nav-pills flex-column mb-auto row-gap-2">
        <li className="nav-item">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary fw-semibold' : 'opacity-75'}`}
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/employees" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary fw-semibold' : 'opacity-75'}`}
          >
            <i className="bi bi-person-lines-fill me-2"></i> Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/employees/add" 
            className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary fw-semibold' : 'opacity-75'}`}
          >
            <i className="bi bi-person-plus-fill me-2"></i> Add Employee
          </NavLink>
        </li>
      </ul>
      <hr className="opacity-25" />
      <div className="small text-center opacity-50">v1.0.0 Stable</div>
    </div>
  );
};

export default Sidebar;