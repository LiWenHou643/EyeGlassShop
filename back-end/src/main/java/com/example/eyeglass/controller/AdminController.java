package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final PersonService personService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<PersonDTO> personDTOS = personService.getAllUsers();
        return new ResponseEntity<>(personDTOS, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        PersonDTO personDTO = personService.getUserById(id);
        return new ResponseEntity<>(personDTO, HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @Valid @RequestBody PersonDTO personDTO) {
        PersonDTO updatedUser = personService.updateUser(id, personDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}