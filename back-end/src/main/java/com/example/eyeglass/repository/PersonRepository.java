package com.example.eyeglass.repository;

import com.example.eyeglass.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<User, Long> {
    // Additional query methods can be defined here if needed
}
