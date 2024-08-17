package com.example.eyeglass.service.impl;

import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.entity.Customer;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.CustomerRepository;
import com.example.eyeglass.repository.RolesRepository;
import com.example.eyeglass.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final RolesRepository rolesRepository;
    private final UserMapper UserMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<CustomerDTO> getAllUsers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                        .map(UserMapper::toDTO)
                        .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getUserById(Long id) {
        Customer customer = customerRepository.findById(id)
                                              .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                      "id"));
        return UserMapper.toDTO(customer);
    }

    @Override
    public CustomerDTO createUser(CreateUserDTO createUserDTO) {

        Customer customer = UserMapper.toEntityFromCreate(createUserDTO);
        Roles roles = rolesRepository.getRolesByName(EyeGlassConstants.ROLE_USER);
        customer.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        customer.setRoles(roles);
        Customer savedCustomer = customerRepository.save(customer);
        return UserMapper.toDTO(savedCustomer);
    }

    @Override
    public CustomerDTO updateUser(Long id, CustomerDTO customerDTO) {
        Customer customer = customerRepository.findById(id)
                                              .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                      "id"));
        customer.setFullName(customerDTO.getFullName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        customer.setAddress(customerDTO.getAddress());
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
        Customer updatedCustomer = customerRepository.save(customer);
        return UserMapper.toDTO(updatedCustomer);
    }
}