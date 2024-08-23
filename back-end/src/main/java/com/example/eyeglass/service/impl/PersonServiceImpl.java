package com.example.eyeglass.service.impl;

import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.exception.UserAlreadyExistsException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.repository.RolesRepository;
import com.example.eyeglass.service.PersonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;
    private final RolesRepository rolesRepository;
    private final UserMapper UserMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<PersonDTO> getAllUsers() {
        List<Person> people = personRepository.findAll();
        return people.stream()
                     .map(UserMapper::toDTO)
                     .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getUserById(Long id) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "id"));
        return UserMapper.toDTO(person);
    }

    @Override
    public PersonDTO getUserByEmail(String email) {
        Person person = personRepository.findByEmail(email)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "email"));
        return UserMapper.toDTO(person);
    }

    @Override
    public PersonDTO createUser(RegisterDTO registerDTO) {
        Optional<Person> customer = personRepository.findByEmail(registerDTO.getEmail());

        if (customer.isPresent()) {
            throw new UserAlreadyExistsException(
                    "User already exists with email: %s".formatted(registerDTO.getEmail()));
        }

        Person newPerson = UserMapper.toEntityFromRegister(registerDTO);
        Roles roles = rolesRepository.getRolesByName(EyeGlassConstants.ROLE_USER);
        newPerson.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        newPerson.setRoles(roles);
        Person savedPerson = personRepository.save(newPerson);
        return UserMapper.toDTO(savedPerson);
    }

    @Override
    public PersonDTO updateUser(Long id, PersonDTO personDTO) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found with " +
                                                "id"));
        person.setFullName(personDTO.getFullName());
        person.setEmail(personDTO.getEmail());
        person.setPhoneNumber(personDTO.getPhoneNumber());
        person.setAddress(personDTO.getAddress());
        person.setPassword(passwordEncoder.encode(personDTO.getPassword()));
        Person updatedPerson = personRepository.save(person);
        return UserMapper.toDTO(updatedPerson);
    }
}