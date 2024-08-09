package com.example.eyeglass.controller;

import com.example.eyeglass.dto.PersonDTO;
import com.example.eyeglass.service.PersonService;
import com.example.eyeglass.service.impl.PersonServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<?> getAllUsers() {
        List<PersonDTO> personDTOS = personService.getAllUsers();
        return new ResponseEntity<>(personDTOS, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        PersonDTO personDTO = personService.getUserById(id);
        return new ResponseEntity<>(personDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody PersonDTO personDTO) {

        PersonDTO savedUser = personService.createUser(personDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}
