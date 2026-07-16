package com.example.ems.employee_management_system.service.impl;

import com.example.ems.employee_management_system.entity.Employee;
import com.example.ems.employee_management_system.entity.EmployeeStatus;
import com.example.ems.employee_management_system.exception.ResourceNotFoundException;
import com.example.ems.employee_management_system.repository.EmployeeRepository;
import com.example.ems.employee_management_system.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Constructor injection for clean architecture
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        existingEmployee.setFirstName(employeeDetails.getFirstName());
        existingEmployee.setLastName(employeeDetails.getLastName());
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setDepartment(employeeDetails.getDepartment());
        existingEmployee.setStatus(employeeDetails.getStatus());

        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
                
        employeeRepository.delete(existingEmployee);
    }
        @Override
    public List<Employee> searchEmployees(String query) {
        if (query == null || query.trim().isEmpty()) {
            return employeeRepository.findAll();
        }
        return employeeRepository.searchEmployees(query);
    }

    @Override
    public Map<String, Long> getDashboardStatistics() {
        Map<String, Long> stats = new HashMap<>();
        
        stats.put("totalEmployees", employeeRepository.count());
        stats.put("activeEmployees", employeeRepository.countByStatus(EmployeeStatus.ACTIVE));
        stats.put("onLeaveEmployees", employeeRepository.countByStatus(EmployeeStatus.ON_LEAVE));
        stats.put("resignedEmployees", employeeRepository.countByStatus(EmployeeStatus.RESIGNED));
        
        return stats;
    }

    
}