import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    onLeaveEmployees: 0,
    resignedEmployees: 0
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats and full list from backend concurrently
    Promise.all([
      EmployeeService.getDashboardStats(),
      EmployeeService.getAllEmployees()
    ])
      .then(([statsResponse, directoryResponse]) => {
        setStats(statsResponse.data);
        // Take the last 5 registered profiles as recent entries
        setRecentEmployees(directoryResponse.data.slice(-5).reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error communicating with backend data streams:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading system metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 fw-bold text-dark">System Dashboard</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Total Employees</h6>
              <h2 className="display-6 fw-bold m-0">{stats.totalEmployees}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Active</h6>
              <h2 className="display-6 fw-bold m-0">{stats.activeEmployees}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">On Leave</h6>
              <h2 className="display-6 fw-bold m-0">{stats.onLeaveEmployees}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Resigned</h6>
              <h2 className="display-6 fw-bold m-0">{stats.resignedEmployees}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white fw-bold py-3 text-secondary">Recently Onboarded Employees</div>
        <div className="card-body p-0">
          {recentEmployees.length === 0 ? (
            <div className="p-4 text-center text-muted">No records currently stored in the system database repository.</div>
          ) : (
            <ul className="list-group list-group-flush">
              {recentEmployees.map((emp) => (
                <li key={emp.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <div>
                    <strong className="d-block text-dark">{emp.firstName} {emp.lastName}</strong>
                    <span className="text-muted small">{emp.department} Department</span>
                  </div>
                  <span className={`badge rounded-pill ${
                    emp.status === 'ACTIVE' ? 'bg-success' : emp.status === 'ON_LEAVE' ? 'bg-warning text-dark' : 'bg-danger'
                  }`}>
                    {emp.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;