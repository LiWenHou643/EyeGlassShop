package com.example.eyeglass.repository;

import com.example.eyeglass.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    // Additional query methods can be defined here if needed
}
