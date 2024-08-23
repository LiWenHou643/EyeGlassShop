package com.example.eyeglass.service;

import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.dto.user.CustomerDTO;

import java.util.List;

public interface CustomerService {

    List<CustomerDTO> getAllUsers();

    CustomerDTO getUserById(Long id);

    CustomerDTO getUserByEmail(String email);

    CustomerDTO createUser(RegisterDTO registerDTO);

    CustomerDTO updateUser(Long id, CustomerDTO customerDTO);

}