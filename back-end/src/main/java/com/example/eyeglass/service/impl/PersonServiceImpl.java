package com.example.eyeglass.service.impl;

import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.service.PersonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PersonServiceImpl implements PersonService {
    PersonRepository personRepository;
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