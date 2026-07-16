package com.example.ems.employee_management_system.service;

import com.example.ems.employee_management_system.entity.Employee;
import java.util.List;
import java.util.Map;

public interface EmployeeService {
    Employee addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    Employee updateEmployee(Long id, Employee employeeDetails);
    void deleteEmployee(Long id);
    List<Employee> searchEmployees(String query);
    Map<String, Long> getDashboardStatistics();
}