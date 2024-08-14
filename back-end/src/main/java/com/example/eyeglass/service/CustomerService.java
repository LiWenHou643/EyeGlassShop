package com.example.eyeglass.service;

import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.CustomerDTO;

import java.util.List;

public interface CustomerService {

    List<CustomerDTO> getAllUsers();

    CustomerDTO getUserById(Long id);

    CustomerDTO createUser(CreateUserDTO createUserDTO);

    CustomerDTO updateUser(Long id, CustomerDTO customerDTO);

}
