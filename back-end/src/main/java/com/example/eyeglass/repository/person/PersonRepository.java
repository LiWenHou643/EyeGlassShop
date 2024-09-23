package com.example.eyeglass.repository.person;

import com.example.eyeglass.entity.Person;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@NonNullApi
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findById(Long id);

    Optional<Person> findByEmail(String email);
}