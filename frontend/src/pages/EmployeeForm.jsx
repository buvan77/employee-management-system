import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Form input state variables mapping exactly to our backend Entity attributes
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    status: 'ACTIVE'
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-populate fields if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          setEmployee(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load employee details:", error);
          setErrorMessage("Error retrieving worker profile record data.");
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  // Handle dynamic text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Form submit handler to push data out to backend database API
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const apiCall = isEditMode 
      ? EmployeeService.updateEmployee(id, employee)
      : EmployeeService.createEmployee(employee);

    apiCall
      .then(() => {
        setLoading(false);
        navigate('/employees'); // Redirect back to index matrix deck on completion
      })
      .catch((error) => {
        console.error("Data tracking persistence error:", error);
        // Display backend custom exception message if available
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to save employee profile records. Please verify entries.");
        }
        setLoading(false);
      });
  };

  if (loading && isEditMode) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading record profile layout details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="fw-bold text-dark mb-4">
        {isEditMode ? 'Modify Record Details' : 'Onboard New Employee'}
      </h2>
      
      {errorMessage && (
        <div className="alert alert-danger shadow-sm small" role="alert">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="firstName"
              placeholder="John" 
              value={employee.firstName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="lastName"
              placeholder="Doe" 
              value={employee.lastName}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            name="email"
            placeholder="john.doe@example.com" 
            value={employee.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Department Assignment</label>
          <select 
            className="form-select" 
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          >
            <option value="">Choose department...</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Management">Product Management</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-semibold text-secondary">Employment Allocation Status</label>
          <select 
            className="form-select" 
            name="status"
            value={employee.status}
            onChange={handleChange}
            required
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="ON_LEAVE">ON_LEAVE</option>
            <option value="RESIGNED">RESIGNED</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => navigate('/employees')}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary fw-semibold px-4"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditMode ? 'Save System Changes' : 'Register Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;