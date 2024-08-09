package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.PersonDTO;
import com.example.eyeglass.entity.Person;

public class PersonMapper {

    public static PersonDTO mapToPersonDTO(Person person) {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setId(person.getId());
        personDTO.setFullName(person.getFullName());
        personDTO.setEmail(person.getEmail());
        personDTO.setPhoneNumber(person.getPhoneNumber());
        personDTO.setAddress(person.getAddress());
        personDTO.setPassword(person.getPassword());
        personDTO.setRoleId(person.getRoleId());
        return personDTO;
    }

    public static Person mapToPerson(PersonDTO personDTO) {
        Person person = new Person();
        personDTO.setId(person.getId());
        person.setFullName(personDTO.getFullName());
        person.setEmail(personDTO.getEmail());
        person.setPhoneNumber(personDTO.getPhoneNumber());
        person.setAddress(personDTO.getAddress());
        person.setPassword(personDTO.getPassword());
        person.setRoleId(personDTO.getRoleId());
        return person;
    }
}
