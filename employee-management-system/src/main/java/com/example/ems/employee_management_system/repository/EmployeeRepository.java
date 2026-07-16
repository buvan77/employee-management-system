package com.example.ems.employee_management_system.repository;

import com.example.ems.employee_management_system.entity.Employee;
import com.example.ems.employee_management_system.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // 1. Search filter method
    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.department) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Employee> searchEmployees(@Param("query") String query);

    // 2. Count method based on employee status enum
    long countByStatus(EmployeeStatus status);

    // 3. Fetch recent 5 employees ordered by creation date
    List<Employee> findTop5ByOrderByCreatedAtDesc();
}