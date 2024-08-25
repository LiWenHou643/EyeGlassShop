package com.example.eyeglass.service.impl;

import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.exception.UserAlreadyExistsException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.repository.RolesRepository;
import com.example.eyeglass.service.PersonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PersonServiceImpl implements PersonService {
    PersonRepository personRepository;
    RolesRepository rolesRepository;
    PasswordEncoder passwordEncoder;
    UserMapper UserMapper;

    @Override
    public List<PersonResponse> getAllUsers() {
        List<Person> people = personRepository.findAll();
        return people.stream()
                     .map(UserMapper::toDTO)
                     .collect(Collectors.toList());
    }

    @Override
    public PersonResponse getUserById(Long id) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "id"));
        return UserMapper.toDTO(person);
    }

    @Override
    public PersonResponse getUserByEmail(String email) {
        Person person = personRepository.findByEmail(email)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "email"));
        return UserMapper.toDTO(person);
    }

    @Override
    public PersonResponse createUser(RegisterRequest registerRequest) {
        Optional<Person> customer = personRepository.findByEmail(registerRequest.getEmail());

        if (customer.isPresent()) {
            throw new UserAlreadyExistsException(
                    "User already exists with email: %s".formatted(registerRequest.getEmail()));
        }

        Person newPerson = UserMapper.toEntityFromRegister(registerRequest);
        Roles roles = rolesRepository.getRolesByName(EyeGlassConstants.ROLE_USER);
        newPerson.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newPerson.setRoles(roles);
        Person savedPerson = personRepository.save(newPerson);
        return UserMapper.toDTO(savedPerson);
    }

    @Override
    public PersonResponse updateUser(Long id, PersonResponse personResponse) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "id"));
        person.setFullName(personResponse.getFullName());
        person.setEmail(personResponse.getEmail());
        person.setPhoneNumber(personResponse.getPhoneNumber());
        person.setAddress(personResponse.getAddress());
        person.setPassword(passwordEncoder.encode(personResponse.getPassword()));
        Person updatedPerson = personRepository.save(person);
        return UserMapper.toDTO(updatedPerson);
    }
}