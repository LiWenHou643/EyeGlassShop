package com.example.eyeglass.service;

import com.example.eyeglass.dto.user.UserDTO;

import java.util.List;

public interface PersonService {

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO createUser(UserDTO userDTO);

    UserDTO updateUser(Long id, UserDTO userDTO);

}
