package com.example.eyeglass.service;


import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;

import java.util.List;

public interface PersonService {

    List<PersonResponse> getAllUsers();

    PersonResponse getUserById(Long id);

    PersonResponse getUserByEmail(String email);

    PersonResponse updateUser(Long id, PersonResponse person);

}