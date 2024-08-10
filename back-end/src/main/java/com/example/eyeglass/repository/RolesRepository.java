package com.example.eyeglass.repository;

import com.example.eyeglass.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles getRolesByName(String name);
}
