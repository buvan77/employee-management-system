import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all employees initially or when search query executes
  const fetchEmployees = (query = "") => {
    setLoading(true);
    EmployeeService.getAllEmployees(query)
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee registry:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle live search bar text updates
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchEmployees(value); // Requests filtered dataset from backend
  };

  // Handle active deletion trigger
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s employment record?`)) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          // Instantly filter out deleted record from UI state array
          setEmployees(employees.filter(emp => emp.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete record:", error);
          alert("Error deleting employee record.");
        });
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">Employee Directory</h2>
        <Link to="/employees/add" className="btn btn-primary fw-semibold shadow-sm">
          + Add New Employee
        </Link>
      </div>

      {/* Dynamic Search Input Bar */}
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by name, email, or department dynamically..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading registry data...</span>
          </div>
        </div>
      ) : (
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
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No records found matching criteria.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td className="fw-semibold text-dark">{emp.firstName} {emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className={`badge ${
                        emp.status === 'ACTIVE' ? 'bg-success' : emp.status === 'ON_LEAVE' ? 'bg-warning text-dark' : 'bg-danger'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link to={`/employees/edit/${emp.id}`} className="btn btn-sm btn-outline-secondary me-2">
                        Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;