package com.example.eyeglass.service.impl;

import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.UserDTO;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.entity.User;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.repository.RolesRepository;
import com.example.eyeglass.service.PersonService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PersonServiceImpl implements PersonService {
    private PersonRepository personRepository;
    private RolesRepository rolesRepository;
    private UserMapper UserMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = personRepository.findAll();
        return users.stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id"));
        return UserMapper.toDTO(user);
    }

    @Override
    public UserDTO createUser(CreateUserDTO createUserDTO) {

        User user = UserMapper.toEntityFromCreate(createUserDTO);
        Roles roles = rolesRepository.getRolesByName(EyeGlassConstants.ROLE_USER);
        user.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        user.setRoles(roles);
        User savedUser = personRepository.save(user);
        return UserMapper.toDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id"));
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User updatedUser = personRepository.save(user);
        return UserMapper.toDTO(updatedUser);
    }

}
