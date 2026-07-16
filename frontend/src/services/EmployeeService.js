import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/employees";
const AUTH_BASE_URL = "http://localhost:8080/api/auth";

// Automatically inject the JWT token into the header of every single outgoing request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class EmployeeService {
    // Authentication endpoint handler
    login(username, password) {
        return axios.post(`${AUTH_BASE_URL}/login`, { username, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                return response.data;
            });
    }

    // Clear local storage on session expiration or logout
    logout() {
        localStorage.removeItem('token');
    }

    getDashboardStats() {
        return axios.get(`${API_BASE_URL}/dashboard-stats`);
    }

    getAllEmployees(searchQuery = "") {
        if (searchQuery.trim() !== "") {
            return axios.get(`${API_BASE_URL}/search?query=${searchQuery}`);
        }
        return axios.get(API_BASE_URL);
    }

    createEmployee(employeeData) {
        return axios.post(API_BASE_URL, employeeData);
    }

    getEmployeeById(employeeId) {
        return axios.get(`${API_BASE_URL}/${employeeId}`);
    }

    updateEmployee(employeeId, employeeData) {
        return axios.put(`${API_BASE_URL}/${employeeId}`, employeeData);
    }

    deleteEmployee(employeeId) {
        return axios.delete(`${API_BASE_URL}/${employeeId}`);
    }
}

export default new EmployeeService();