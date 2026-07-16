import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4 fw-bold text-dark">System Dashboard</h2>
      
      {/* Metric Display Cards Grid */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Total Employees</h6>
              <h2 className="display-6 fw-bold m-0">120</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Active</h6>
              <h2 className="display-6 fw-bold m-0">98</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">On Leave</h6>
              <h2 className="display-6 fw-bold m-0">14</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title text-uppercase opacity-75 small">Resigned</h6>
              <h2 className="display-6 fw-bold m-0">8</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Mock Table Placeholder */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white fw-bold py-3 text-secondary">Recently Onboarded Employees</div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center py-3">
              <div>
                <strong className="d-block text-dark">Meraj Khan</strong>
                <span className="text-muted small">Engineering Department</span>
              </div>
              <span className="badge bg-success rounded-pill">Active</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center py-3">
              <div>
                <strong className="d-block text-dark">Jane Doe</strong>
                <span className="text-muted small">Product Management</span>
              </div>
              <span className="badge bg-success rounded-pill">Active</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;