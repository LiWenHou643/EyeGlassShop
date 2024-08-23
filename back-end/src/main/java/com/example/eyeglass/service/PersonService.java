package com.example.eyeglass.service;

import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.dto.user.RegisterDTO;

import java.util.List;

public interface PersonService {

    List<PersonDTO> getAllUsers();

    PersonDTO getUserById(Long id);

    PersonDTO getUserByEmail(String email);

    PersonDTO createUser(RegisterDTO registerDTO);

    PersonDTO updateUser(Long id, PersonDTO personDTO);

}