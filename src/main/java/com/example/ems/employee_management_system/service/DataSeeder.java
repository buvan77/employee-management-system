package com.example.ems.employee_management_system.service;

import com.example.ems.employee_management_system.model.User;
import com.example.ems.employee_management_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the administrative workspace is empty
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            // Securely hash the initial password pass matching SecurityConfig standard
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ROLE_HR_ADMIN");

            userRepository.save(admin);
            System.out.println(">> Security Database: Default HR Admin account seeded successfully (admin/admin123).");
        }
    }
}