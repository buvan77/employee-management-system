import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">Employee Directory</h2>
        <Link to="/employees/add" className="btn btn-primary fw-semibold shadow-sm">
          + Add New Employee
        </Link>
      </div>

      {/* Search Input Filter Action Bar */}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by name, email, or department..." 
        />
      </div>

      {/* Core Interface Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle border-top m-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="fw-semibold text-dark">Meraj Khan</td>
              <td>meraj@example.com</td>
              <td>Engineering</td>
              <td><span className="badge bg-success">ACTIVE</span></td>
              <td className="text-end">
                <Link to="/employees/edit/1" className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;