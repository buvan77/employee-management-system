import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="fw-bold text-dark mb-4">{isEditMode ? 'Modify Record Details' : 'Onboard New Employee'}</h2>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">First Name</label>
            <input type="text" className="form-control" placeholder="John" required />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">Last Name</label>
            <input type="text" className="form-control" placeholder="Doe" required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Email Address</label>
          <input type="email" className="form-control" placeholder="john.doe@example.com" required />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">Department Assignment</label>
          <select className="form-select" required>
            <option value="">Choose department...</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Management">Product Management</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-semibold text-secondary">Employment Allocation Status</label>
          <select className="form-select" defaultValue="ACTIVE" required>
            <option value="ACTIVE">ACTIVE</option>
            <option value="ON_LEAVE">ON_LEAVE</option>
            <option value="RESIGNED">RESIGNED</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button type="button" className="btn btn-light" onClick={() => navigate('/employees')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary fw-semibold px-4">
            {isEditMode ? 'Save System Changes' : 'Register Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;