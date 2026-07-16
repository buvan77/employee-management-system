import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/employees";

class EmployeeService {
    // 1. Fetch dashboard metric statistics
    getDashboardStats() {
        return axios.get(`${API_BASE_URL}/dashboard-stats`);
    }

    // 2. Fetch all employees or handle query filters
    getAllEmployees(searchQuery = "") {
        if (searchQuery.trim() !== "") {
            return axios.get(`${API_BASE_URL}/search?query=${searchQuery}`);
        }
        return axios.get(API_BASE_URL);
    }

    // 3. Create a new employee record
    createEmployee(employeeData) {
        return axios.post(API_BASE_URL, employeeData);
    }

    // 4. Retrieve a specific record by its primary key id
    getEmployeeById(employeeId) {
        return axios.get(`${API_BASE_URL}/${employeeId}`);
    }

    // 5. Update an existing record
    updateEmployee(employeeId, employeeData) {
        return axios.put(`${API_BASE_URL}/${employeeId}`, employeeData);
    }

    // 6. Delete an employee record
    deleteEmployee(employeeId) {
        return axios.delete(`${API_BASE_URL}/${employeeId}`);
    }
}

// Export a single instantiated instance of the service class
export default new EmployeeService();