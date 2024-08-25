package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.service.PersonService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/admin")
public class AdminController {

    PersonService personService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<PersonResponse> personResponses = personService.getAllUsers();
        return new ResponseEntity<>(personResponses, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        PersonResponse personResponse = personService.getUserById(id);
        return new ResponseEntity<>(personResponse, HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @Valid @RequestBody PersonResponse personResponse) {
        PersonResponse updatedUser = personService.updateUser(id, personResponse);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}