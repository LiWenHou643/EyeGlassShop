package com.example.eyeglass.service;

import com.example.eyeglass.dto.PersonDTO;

import java.util.List;

public interface PersonService {

    List<PersonDTO> getAllUsers();
    PersonDTO getUserById(Long id);
    PersonDTO createUser(PersonDTO personDTO);
}
