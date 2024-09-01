package com.example.eyeglass.repository;

import com.example.eyeglass.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends CrudRepository<Roles, Long> {
    Roles getRolesByName(String name);
}