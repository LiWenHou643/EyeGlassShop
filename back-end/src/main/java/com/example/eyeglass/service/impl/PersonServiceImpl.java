package com.example.eyeglass.service.impl;

import com.example.eyeglass.dto.PersonDTO;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.exception.ResourceNotFoundException;
import com.example.eyeglass.mapper.PersonMapperInterface;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.service.PersonService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PersonServiceImpl implements PersonService {
    private PersonRepository personRepository;

    private PersonMapperInterface PersonMapper;

    @Override
    public List<PersonDTO> getAllUsers() {
        List<Person> persons = personRepository.findAll();
        return persons.stream()
                .map(PersonMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getUserById(Long id) {
        Person person = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id"));
        return PersonMapper.toDTO(person);
    }

    @Override
    public PersonDTO createUser(PersonDTO personDTO) {

        Person person = PersonMapper.toEntity(personDTO);
        Person savedPerson = personRepository.save(person);
        return PersonMapper.toDTO(savedPerson);
    }

}
