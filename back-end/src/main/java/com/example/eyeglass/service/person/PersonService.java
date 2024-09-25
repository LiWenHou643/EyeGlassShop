package com.example.eyeglass.service.person;

import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.person.PersonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.eyeglass.mapper.PersonMapper.PERSON_MAPPER;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PersonService {
    PersonRepository personRepository;
    PasswordEncoder passwordEncoder;


    public List<PersonResponse> getAll() {
        List<Person> people = personRepository.findAll();
        return people.stream()
                     .map(PERSON_MAPPER::toPersonResponse)
                     .collect(Collectors.toList());
    }

    public PersonResponse getPersonById(Long id) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return PERSON_MAPPER.toPersonResponse(person);
    }

    public PersonResponse getPersonByEmail(String email) {
        Person person = personRepository.findByEmail(email)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return PERSON_MAPPER.toPersonResponse(person);
    }

    public PersonResponse updatePerson(Long id, PersonResponse personResponse) {
        Person person = personRepository.findById(id)
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        person.setFullName(personResponse.getFullName());
        person.setEmail(personResponse.getEmail());
        person.setPhoneNumber(personResponse.getPhoneNumber());
        person.setAddress(personResponse.getAddress());
        person.setPassword(passwordEncoder.encode(personResponse.getPassword()));
        Person updatedPerson = personRepository.save(person);
        return PERSON_MAPPER.toPersonResponse(updatedPerson);
    }
}